MicroEvent = require 'microevent'
PageSpreads = require './page-spreads'
clientLocalStorage = require '../../storage/client-local'
SGN = require '../../sgn'

class PagedPublicationCore
    defaults:
        pages: []
        pageSpreadWidth: 100
        pageSpreadMaxZoomScale: 4
        idleDelay: 1000
        resizeDelay: 400
        color: '#ffffff'

    constructor: (el, options = {}) ->
        @options = @makeOptions options, @defaults
        @pageId = @getOption 'pageId'
        @els =
            root: el
            pages: el.querySelector '.sgn-pp__pages'
            verso: el.querySelector '.verso'
        @pageMode = @getPageMode()
        @pageSpreads = new PageSpreads
            pages: @getOption 'pages'
            maxZoomScale: @getOption 'pageSpreadMaxZoomScale'
            width: @getOption 'pageSpreadWidth'

        @pageSpreads.bind 'pageLoaded', @pageLoaded.bind(@)
        @pageSpreads.bind 'pagesLoaded', @pagesLoaded.bind(@)

        @setColor @getOption('color')

        # It's important to insert the page spreads before instantiating Verso.
        @els.pages.parentNode.insertBefore @pageSpreads.update(@pageMode).getFrag(), @els.pages

        @verso = @createVerso()

        @bind 'started', @start.bind(@)
        @bind 'destroyed', @destroy.bind(@)

        return

    start: ->
        @getVerso().start()

        @visibilityChangeListener = @visibilityChange.bind @
        @resizeListener = SGN.util.throttle @resize, @getOption('resizeDelay'), @
        @unloadListener = @unload.bind @

        document.addEventListener 'visibilitychange', @visibilityChangeListener, false
        window.addEventListener 'resize', @resizeListener, false
        window.addEventListener 'beforeunload', @unloadListener, false

        @els.root.setAttribute 'data-started', ''
        @els.root.setAttribute 'tabindex', '-1'
        @els.root.focus()

        return

    destroy: ->
        @getVerso().destroy()

        document.removeEventListener 'visibilitychange', @visibilityChangeListener, false
        window.removeEventListener 'resize', @resizeListener, false

        return

    makeOptions: (options, defaults) ->
        opts = {}

        opts[key] = options[key] ? defaults[key] for key, value of options

        opts

    getOption: (key) ->
        @options[key]

    setColor: (color) ->
        @els.root.dataset.colorBrightness = SGN.util.getColorBrightness color
        @els.root.style.backgroundColor = color

        return

    createVerso: ->
        Verso = require 'verso-browser'
        verso = new Verso @els.verso, pageId: @pageId

        verso.pageSpreads.forEach @overridePageSpreadContentRect.bind(@)

        verso.bind 'beforeNavigation', @beforeNavigation.bind(@)
        verso.bind 'afterNavigation', @afterNavigation.bind(@)
        verso.bind 'attemptedNavigation', @attemptedNavigation.bind(@)
        verso.bind 'clicked', @clicked.bind(@)
        verso.bind 'doubleClicked', @doubleClicked.bind(@)
        verso.bind 'pressed', @pressed.bind(@)
        verso.bind 'panStart', @panStart.bind(@)
        verso.bind 'panEnd', @panEnd.bind(@)
        verso.bind 'zoomedIn', @zoomedIn.bind(@)
        verso.bind 'zoomedOut', @zoomedOut.bind(@)

        verso

    getVerso: ->
        @verso

    getContentRect: (pageSpread) ->
        rect =
            top: 0
            left: 0
            right: 0
            bottom: 0
            width: 0
            height: 0
        pageEls = pageSpread.getPageEls()
        pageEl = pageEls[0]
        pageCount = pageEls.length

        return rect if not pageCount
        
        scale = @getVerso().transform.scale
        pageWidth = pageEl.offsetWidth * pageCount * scale
        pageHeight = pageEl.offsetHeight * scale
        imageRatio = +pageEl.dataset.height / (+pageEl.dataset.width * pageCount)
        actualHeight = pageHeight
        actualWidth = actualHeight / imageRatio
        actualWidth = Math.min pageWidth, actualWidth
        actualHeight = actualWidth * imageRatio
        clientRect = pageEl.getBoundingClientRect()

        rect.width = actualWidth
        rect.height = actualHeight
        rect.top = clientRect.top + (pageHeight - actualHeight) / 2
        rect.left = clientRect.left + (pageWidth - actualWidth) / 2
        rect.right = rect.width + rect.left
        rect.bottom = rect.height + rect.top

        rect

    formatProgressLabel: (pageSpread) ->
        pages = pageSpread?.options.pages ? []
        pageIds = pages.map (page) -> page.id
        pageLabels = pages.map (page) -> page.label
        pageCount = @getOption('pages').length
        label = if pageIds.length > 0 then pageLabels.join('-') + ' / ' + pageCount else null

        label

    renderPageSpreads: ->
        @getVerso().pageSpreads.forEach (pageSpread) =>
            visibility = pageSpread.getVisibility()
            match = @pageSpreads.get pageSpread.getId()

            if match?
                if visibility is 'visible' and match.contentsRendered is false
                    setTimeout match.renderContents.bind(match), 0
                if visibility is 'gone' and match.contentsRendered is true
                    setTimeout match.clearContents.bind(match), 0

            return

        @

    findPage: (pageId) ->
        SGN.util.find @getOption('pages'), (page) -> page.id is pageId

    pageLoaded: (e) ->
        @trigger 'pageLoaded', e

        return

    pagesLoaded: (e) ->
        @trigger 'pagesLoaded', e

        return

    beforeNavigation: (e) ->
        position = e.newPosition
        theVerso = @getVerso()
        versoPageSpread = theVerso.getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()
        pageSpreadCount = theVerso.getPageSpreadCount()
        newSpreadEl = theVerso.pageSpreadEls[e.newPosition]
        progress = position / (pageSpreadCount - 1) * 100
        progressLabel = @formatProgressLabel pageSpread

        @els.root.setAttribute 'data-navigating', true

        @renderPageSpreads()
        @resetIdleTimer()
        @startIdleTimer()
        @trigger 'beforeNavigation',
            verso: e
            pageSpread: pageSpread
            newSpreadEl: newSpreadEl
            progress: progress
            progressLabel: progressLabel
            pageSpreadCount: pageSpreadCount
            newPositionIsEnd: e.newPosition + 1 == pageSpreadCount

        return

    afterNavigation: (e) ->
        position = e.newPosition
        theVerso = @getVerso()
        versoPageSpread = theVerso.getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()
        pageSpreadCount = theVerso.getPageSpreadCount()
        newSpreadEl = theVerso.pageSpreadEls[e.newPosition]

        @els.root.setAttribute 'data-navigating', false

        @trigger 'afterNavigation',
            verso: e
            pageSpread: pageSpread
            pageSpreadCount: pageSpreadCount
            newSpreadEl: newSpreadEl
            newPositionIsEnd: e.newPosition + 1 == pageSpreadCount

        return

    attemptedNavigation: (e) ->
        @trigger 'attemptedNavigation', verso: e

        return

    clicked: (e) ->
        if e.isInsideContent
            pageId = e.pageEl.dataset.id
            page = @findPage pageId

            @trigger 'clicked', verso: e, page: page

        return

    doubleClicked: (e) ->
        if e.isInsideContent
            pageId = e.pageEl.dataset.id
            page = @findPage pageId

            @trigger 'doubleClicked', verso: e, page: page

        return

    pressed: (e) ->
        if e.isInsideContent
            pageId = e.pageEl.dataset.id
            page = @findPage pageId

            @trigger 'pressed', verso: e, page: page

        return

    panStart: ->
        @resetIdleTimer()
        @trigger 'panStart', scale: @getVerso().transform.scale

        return

    panEnd: ->
        @startIdleTimer()
        @trigger 'panEnd'

        return

    zoomedIn: (e) ->
        position = e.position
        versoPageSpread = @getVerso().getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()

        pageSpread.zoomIn() if pageSpread?

        @els.root.setAttribute 'data-zoomed-in', true
        @trigger 'zoomedIn', verso: e, pageSpread: pageSpread

        return

    zoomedOut: (e) ->
        position = e.position
        versoPageSpread = @getVerso().getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()

        pageSpread.zoomOut() if pageSpread?

        @els.root.setAttribute 'data-zoomed-in', false
        @trigger 'zoomedOut', verso: e, pageSpread: pageSpread

        return

    getPageMode: ->
        pageMode = @getOption 'pageMode'

        if not pageMode?
            width = @els.root.offsetWidth
            height = @els.root.offsetHeight

            pageMode = if height >= width then 'single' else 'double'

        pageMode

    resetIdleTimer: ->
        clearTimeout @idleTimeout

        @els.root.setAttribute 'data-idle', false

        @

    startIdleTimer: ->
        @idleTimeout = setTimeout =>
            @els.root.setAttribute 'data-idle', true

            return
        , @getOption('idleDelay')

        @

    switchPageMode: (pageMode) ->
        return @ if @pageMode is pageMode

        verso = @getVerso()
        pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds()
        pageSpreadEls = @getVerso().el.querySelectorAll '.sgn-pp__page-spread'

        @pageMode = pageMode

        @pageSpreads.update @pageMode

        pageSpreadEl.parentNode.removeChild pageSpreadEl for pageSpreadEl in pageSpreadEls
        @els.pages.parentNode.insertBefore @pageSpreads.getFrag(), @els.pages

        verso.refresh()
        verso.navigateTo verso.getPageSpreadPositionFromPageId(pageIds[0]), duration: 0
        verso.pageSpreads.forEach @overridePageSpreadContentRect.bind(@)

        @

    overridePageSpreadContentRect: (pageSpread) ->
        if pageSpread.getType() is 'page'
            pageSpread.getContentRect = => @getContentRect pageSpread

    visibilityChange: ->
        pageSpread = @getVerso().getPageSpreadFromPosition @getVerso().getPosition()
        eventName = if document.hidden is true then 'disappeared' else 'appeared'

        @trigger eventName, pageSpread: @pageSpreads.get(pageSpread.id)

        return

    resize: ->
        pageMode = @getPageMode()

        if not @getOption('pageMode')? and pageMode isnt @pageMode
            @switchPageMode pageMode
        else
            @trigger 'resized'

        return

    unload: ->
        @trigger 'disappeared'

        return

MicroEvent.mixin PagedPublicationCore

module.exports = PagedPublicationCore

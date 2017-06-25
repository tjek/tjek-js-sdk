MicroEvent = require 'microevent'
Verso = require 'verso'
PageSpreads = require './page_spreads'
clientLocalStorage = require '../../storage/client_local'
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
        @pageId = @getOption('pageId') ? @getSavedPageId()
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

        @els.root.dataset.started = ''
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
        verso = new Verso @els.verso, pageId: @pageId

        verso.pageSpreads.forEach (pageSpread) =>
            if pageSpread.getType() is 'page'
                pageSpread.getContentRect = => @getContentRect pageSpread

            return

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
        @getOption('pages').find (page) -> page.id is pageId

    getSavedPageId: ->
        id = @getOption 'id'
        
        clientLocalStorage.get "paged-publication-progress-#{id}"

    saveCurrentPageId: (pageId) ->
        id = @getOption 'id'

        clientLocalStorage.set "paged-publication-progress-#{id}", pageId

        return

    pageLoaded: (e) ->
        @trigger 'pageLoaded', e

        return

    pagesLoaded: (e) ->
        @trigger 'pagesLoaded', e

        return

    beforeNavigation: (e) ->
        position = e.newPosition
        versoPageSpread = @getVerso().getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()
        pageSpreadCount = @getVerso().getPageSpreadCount()
        progress = (position + 1) / pageSpreadCount * 100
        progressLabel = @formatProgressLabel pageSpread

        @renderPageSpreads()
        @saveCurrentPageId versoPageSpread.getPageIds()[0]
        @resetIdleTimer()
        @startIdleTimer()
        @trigger 'beforeNavigation',
            verso: e
            pageSpread: pageSpread
            progress: progress
            progressLabel: progressLabel
            pageSpreadCount: pageSpreadCount

        return

    afterNavigation: (e) ->
        position = e.newPosition
        versoPageSpread = @getVerso().getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()

        @trigger 'afterNavigation',
            verso: e
            pageSpread: pageSpread

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

        @els.root.dataset.zoomedIn = true
        @trigger 'zoomedIn', verso: e, pageSpread: pageSpread

        return

    zoomedOut: (e) ->
        position = e.position
        versoPageSpread = @getVerso().getPageSpreadFromPosition position
        pageSpread = @pageSpreads.get versoPageSpread.getId()

        pageSpread.zoomOut() if pageSpread?

        @els.root.dataset.zoomedIn = false
        @trigger 'zoomedOut', verso: e, pageSpread: pageSpread

        return

    getPageMode: ->
        pageMode = @getOption 'pageMode'

        if not pageMode?
            width = @els.root.offsetWidth
            height = @els.root.offsetHeight
            ratio = height / width

            pageMode = if ratio >= 0.75 then 'single' else 'double'

        pageMode

    resetIdleTimer: ->
        clearTimeout @idleTimeout

        @els.root.dataset.idle = false

        @

    startIdleTimer: ->
        @idleTimeout = setTimeout =>
            @els.root.dataset.idle = true

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

        @

    visibilityChange: ->
        pageSpread = @getVerso().getPageSpreadFromPosition @getVerso().getPosition()
        eventName = if document.hidden is true then 'disappeared' else 'appeared'

        @trigger eventName, pageSpread: @pageSpreads.get(pageSpread.id)

        return

    resize: ->
        @switchPageMode @getPageMode() if not @getOption('pageMode')?

        @trigger 'resized'

        return

    unload: ->
        @trigger 'disappeared'

        return

MicroEvent.mixin PagedPublicationCore

module.exports = PagedPublicationCore

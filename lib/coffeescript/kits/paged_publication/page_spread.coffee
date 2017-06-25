MicroEvent = require 'microevent'
SGN = require '../../sgn'

class PagedPublicationPageSpread
    constructor: (@options = {}) ->
        @contentsRendered = false
        @hotspotsRendered = false
        @el = @renderEl()

        return

    getId: ->
        @options.id

    getEl: ->
        @el

    getPages: ->
        @options.pages

    renderEl: ->
        el = document.createElement 'div'
        pageIds = @getPages().map (page) -> page.id

        el.className = 'verso__page-spread sgn-pp__page-spread'

        el.setAttribute 'data-id', @getId()
        el.setAttribute 'data-type', 'page'
        el.setAttribute 'data-width', @options.width
        el.setAttribute 'data-page-ids', pageIds.join(',')
        el.setAttribute 'data-max-zoom-scale', @options.maxZoomScale
        el.setAttribute 'data-zoomable', false

        el

    renderContents: ->
        id = @getId()
        el = @getEl()
        pages = @getPages()
        pageCount = pages.length
        imageLoads = 0

        pages.forEach (page, i) =>
            image = page.images.medium
            pageEl = document.createElement 'div'
            loaderEl = document.createElement 'div'

            pageEl.className = 'sgn-pp__page verso__page'
            pageEl.dataset.id = page.id if page.id?

            if pageCount is 2
                pageEl.className += if i is 0 then ' verso-page--verso' else ' verso-page--recto'

            pageEl.appendChild loaderEl
            el.appendChild pageEl

            loaderEl.className = 'sgn-pp-page__loader'
            loaderEl.innerHTML = "<span>#{page.label}</span>"

            SGN.util.loadImage image, (err, width, height) =>
                if not err?
                    pageEl.style.backgroundImage = "url(#{image})"
                    pageEl.dataset.width = width
                    pageEl.dataset.height = height
                    pageEl.innerHTML = '&nbsp;'

                    el.dataset.zoomable = true

                    imageLoads++

                    @trigger 'pageLoaded', pageSpreadId: id, page: page
                    @trigger 'pagesLoaded', pageSpreadId: id, pages: pages if imageLoads is pageCount
                else
                    loaderEl.innerHTML = '<span>!</span>'

                return

            return

        @contentsRendered = true

        @

    clearContents: (pageSpread, versoPageSpread) ->
        @el.innerHTML = ''
        @contentsRendered = false

        @

    zoomIn: ->
        pageEls = [].slice.call @el.querySelectorAll('.sgn-pp__page')
        pages = @getPages()

        pageEls.forEach (pageEl) =>
            id = pageEl.dataset.id
            page = pages.find (page) -> page.id is id
            image = page.images.large

            SGN.util.loadImage image, (err) =>
                if not err? and @el.dataset.active is 'true'
                    pageEl.dataset.image = pageEl.style.backgroundImage
                    pageEl.style.backgroundImage = "url(#{image})"

                return

            return

        return

    zoomOut: ->
        pageEls = [].slice.call @el.querySelectorAll('.sgn-pp__page[data-image]')

        pageEls.forEach (pageEl) ->
            pageEl.style.backgroundImage = pageEl.dataset.image
            
            delete pageEl.dataset.image

            return

        return

MicroEvent.mixin PagedPublicationPageSpread

module.exports = PagedPublicationPageSpread

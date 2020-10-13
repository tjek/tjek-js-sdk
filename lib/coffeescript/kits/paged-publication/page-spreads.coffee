import MicroEvent from 'microevent'
import PageSpread from './page-spread'
import { chunk } from '../../util'

class PagedPublicationPageSpreads
    constructor: (@options) ->
        @collection = []
        @ids = {}

        return

    get: (id) ->
        @ids[id]

    getFrag: ->
        frag = document.createDocumentFragment()

        @collection.forEach (pageSpread) -> frag.appendChild pageSpread.el

        frag

    update: (pageMode = 'single') ->
        pageSpreads = []
        ids = {}
        pages = @options.pages.slice()
        width = @options.width
        maxZoomScale = @options.maxZoomScale

        if pageMode is 'single'
            pages.forEach (page) -> pageSpreads.push [page]
        else
            firstPage = pages.shift()
            lastPage = if pages.length % 2 is 1 then pages.pop() else null
            midstPageSpreads = chunk pages, 2

            pageSpreads.push [firstPage] if firstPage?
            midstPageSpreads.forEach (midstPages) -> pageSpreads.push midstPages.map (page) -> page
            pageSpreads.push [lastPage] if lastPage?

        @collection = pageSpreads.map (pageSpreadPages, i) =>
            id = "#{pageMode}-#{i}"
            pageSpread = new PageSpread
                width: width
                pageMode: pageMode
                maxZoomScale: maxZoomScale
                pages: pageSpreadPages
                id: id

            pageSpread.bind 'pageLoaded', (e) => @trigger 'pageLoaded', e
            pageSpread.bind 'pagesLoaded', (e) => @trigger 'pagesLoaded', e

            ids[id] = pageSpread

            pageSpread
        @ids = ids

        @

MicroEvent.mixin PagedPublicationPageSpreads

export default PagedPublicationPageSpreads

Incito = require 'incito-browser'
MicroEvent = require 'microevent'
Popover = require '../../popover'

class Viewer
    constructor: (el, @options = {}) ->
        @els =
            root: el
            incito: el.querySelector '.incito'
        @incito = new Incito @els.incito,
            incito: @options.incito
        @popover = null
        
        trigger = @incito.trigger

        @incito.trigger = (args...) =>
            trigger.apply @incito, args
            @trigger.apply @, args
            
            return

        return
    
    start: ->
        @els.root.setAttribute 'data-started', ''
        @els.root.setAttribute 'tabindex', '-1'
        @els.root.focus()

        @incito.start()

        @_trackEvent
            type: 'x-incito-publication-opened',
            properties: {}

        @
    
    destroy: ->
        @popover.destroy() if @popover?
        
        return
    
    pickOfferProduct: (e, callback) ->
        return unless e.incito.role is 'offer'

        products = e.incito.meta.products

        @popover.destroy() if @popover?

        if products.length is 1
            callback products[0]
        else if products.length > 1
            @popover = new Popover
                header: SGN.translations.t 'incito_publication.product_picker.header'
                x: e.originalEvent.x
                y: e.originalEvent.y
                singleChoiceItems: products.map (product) -> title: product.title

            @popover.bind 'selected', (e) =>
                callback products[e.index]

                @popover.destroy()

                return

            @popover.bind 'destroyed', =>
                @popover = null

                @els.root.focus()

                return

            @els.root.appendChild @popover.el
            @popover.render().el.focus()

        return
    
    _trackEvent: (e) ->
        type = e.type
        properties =
            id: @options.id
        eventTracker = @options.eventTracker

        properties[key] = value for key, value of e.properties

        eventTracker.trackEvent type, properties if eventTracker?

MicroEvent.mixin Viewer

module.exports = Viewer
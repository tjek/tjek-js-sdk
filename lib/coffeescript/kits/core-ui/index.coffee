Gator = require 'gator'

module.exports =
    OfferDetails: require './offer-details'

    Popover: require './popover'

    singleChoicePopover: require './single-choice-popover'

    on: (el, events, selector, callback) ->
        Gator(el).on events, selector, callback

    off: (el, events, selector, callback) ->
        Gator(el).off events, selector, callback
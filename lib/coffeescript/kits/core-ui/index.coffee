import Gator from '../../../../vendor/gator'
export { default as OfferDetails } from './offer-details'
export { default as Popover } from './popover'
export { default as singleChoicePopover } from './single-choice-popover'

# Little bit of export wackiness here because `on` and `off` are coffescript keywords.
GatorOn = (el, events, selector, callback) ->
    Gator(el).on events, selector, callback
export { GatorOn as on }

GatorOff = (el, events, selector, callback) ->
    Gator(el).off events, selector, callback
export { GatorOff as off }

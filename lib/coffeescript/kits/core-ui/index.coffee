import Gator from '../../../../vendor/gator'


On = (el, events, selector, callback) ->
    Gator(el).on events, selector, callback

Off = (el, events, selector, callback) ->
    Gator(el).off events, selector, callback
    
# on and off are reserved indentifiers in coffeescript
# at least this works
export { On as on }
export { Off as off }
export { default as OfferDetails } from './offer-details'
export { default as Popover } from './popover'
export { default as singleChoicePopover } from './single-choice-popover'

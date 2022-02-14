import Gator from '../../../vendor/gator';
export {default as ListPublications} from './list-publications';
export {default as OfferDetails} from './offer-details';
export {default as PagedPublication} from './paged-publication';
export {default as IncitoPublication} from './incito-publication';
export {default as Popover} from './popover';
export {default as singleChoicePopover} from './single-choice-popover';

export const on = (el, events, selector, callback) =>
    Gator(el).on(events, selector, callback);

export const off = (el, events, selector, callback) =>
    Gator(el).off(events, selector, callback);

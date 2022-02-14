const _getMatcher = (element) =>
    element.matches ||
    element.webkitMatchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector ||
    element.oMatchesSelector ||
    Function.prototype;

let _level = 0;
function _matchesSelector(element, selector, boundElement) {
    if (element === boundElement) return;

    if (_getMatcher(element).call(element, selector)) return element;

    if (element.parentElement) {
        _level++;
        return _matchesSelector(element.parentElement, selector, boundElement);
    }
}
const handlersBySelectorByTypeByInstance = {};
function _bind(events, selector, callback, remove) {
    if (!(events instanceof Array)) events = [events];

    const id = this.id;
    let handlersBySelectorByType = handlersBySelectorByTypeByInstance[this.id];
    for (let k = 0; k < events.length; k++) {
        const type = events[k];
        if (remove) {
            // if there are no events tied to this element at all
            // then don't do anything
            if (!handlersBySelectorByType) return;

            // if there is no event type specified then remove all events
            // example: Gator(element).off()
            if (!type) {
                for (const handleType in handlersBySelectorByType) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            handlersBySelectorByType,
                            handleType
                        )
                    ) {
                        handlersBySelectorByType[handleType] = {};
                    }
                }
                return;
            }

            // if no callback or selector is specified remove all events of this type
            // example: Gator(element).off('click')
            if (!callback && !selector) {
                handlersBySelectorByType[type] = {};
                return;
            }

            // if a selector is specified but no callback remove all events
            // for this selector
            // example: Gator(element).off('click', '.sub-element')
            if (!callback) {
                delete handlersBySelectorByType[type][selector];
                return;
            }

            // if we have specified an event type, selector, and callback then we
            // need to make sure there are callbacks tied to this selector to
            // begin with.  if there aren't then we can stop here
            if (!handlersBySelectorByType[type][selector]) return;

            // if there are then loop through all the callbacks and if we find
            // one that matches remove it from the array
            for (
                let i = 0;
                i < handlersBySelectorByType[type][selector].length;
                i++
            ) {
                const handlers = handlersBySelectorByType[type][selector];
                if (handlers[i] === callback) {
                    handlers.splice(i, 1);
                    break;
                }
            }
            continue;
        }

        if (!handlersBySelectorByType || !handlersBySelectorByType[type])
            this.element.addEventListener(
                type,
                (e) => {
                    const handlersBySelector = handlersBySelectorByType[type];
                    if (!handlersBySelector) return;

                    const target = e.target;
                    const matches = {};

                    // find all events that match
                    _level = 0;
                    for (const handlerSelector in handlersBySelector) {
                        if (
                            target instanceof HTMLElement &&
                            Object.prototype.hasOwnProperty.call(
                                handlersBySelector,
                                handlerSelector
                            )
                        ) {
                            const match = _matchesSelector(
                                target,
                                handlerSelector,
                                instances[id].element
                            );

                            if (match) {
                                _level++;
                                handlersBySelector[handlerSelector].match =
                                    match;
                                matches[_level] =
                                    handlersBySelector[handlerSelector];
                            }
                        }
                    }

                    // stopPropagation() fails to set cancelBubble to true in Webkit
                    // @see http://code.google.com/p/chromium/issues/detail?id=162270
                    e.stopPropagation = function () {
                        e.cancelBubble = true;
                    };

                    for (let i = 0; i <= _level; i++) {
                        if (matches[i]) {
                            for (let j = 0; j < matches[i].length; j++) {
                                if (
                                    matches[i][j].call(matches[i].match, e) ===
                                    false
                                ) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return;
                                }

                                if (e.cancelBubble) return;
                            }
                        }
                    }
                },
                type == 'blur' || type == 'focus'
            );

        if (!handlersBySelectorByType) {
            handlersBySelectorByTypeByInstance[id] = {};
            handlersBySelectorByType = handlersBySelectorByTypeByInstance[id];
        }

        if (!handlersBySelectorByType[type]) {
            handlersBySelectorByType[type] = {};
        }

        if (!handlersBySelectorByType[type][selector])
            handlersBySelectorByType[type][selector] = [];

        handlersBySelectorByType[type][selector].push(callback);
    }
}

let _id = 0;
const instances = {};
function Gator(element, id) {
    // called as function
    if (!(this instanceof Gator)) {
        // only keep one Gator instance per node to make sure that
        // we don't create a ton of new objects if you want to delegate
        // multiple events from the same node
        //
        // for example: Gator(document).on(...
        for (const key in instances) {
            if (instances[key].element === element) return instances[key];
        }

        _id++;
        return (instances[_id] = new Gator(element, _id));
    }

    this.element = element;
    this.id = id;
}

Gator.prototype.on = function (events, selector, callback) {
    _bind.call(this, events, selector, callback);
};

Gator.prototype.off = function (events, selector, callback) {
    _bind.call(this, events, selector, callback, true);
};

export default Gator;

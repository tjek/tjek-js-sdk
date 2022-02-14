import {INPUT_CANCEL, INPUT_END} from '../Input';
import Recognizer, {
    STATE_BEGAN,
    STATE_CANCELLED,
    STATE_CHANGED,
    STATE_ENDED,
    STATE_FAILED
} from '../Recognizer';

/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
export default class AttrRecognizer extends Recognizer {
    /**
     * @private
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest(input) {
        const optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    }

    /**
     * @private
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process(input) {
        const {state} = this;

        const isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        const isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (input.eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        }
        if (isRecognized || isValid) {
            if (input.eventType & INPUT_END) return state | STATE_ENDED;

            if (!(state & STATE_BEGAN)) return STATE_BEGAN;

            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
}

AttrRecognizer.prototype.defaults = {
    /**
     * @private
     * @type {Number}
     * @default 1
     */
    pointers: 1
};

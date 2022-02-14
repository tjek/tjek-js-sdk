import Input, {
    INPUT_CANCEL,
    INPUT_END,
    INPUT_MOVE,
    INPUT_START,
    INPUT_TYPE_TOUCH,
    TOUCH_INPUT_MAP
} from '../Input';
import uniqueArray from '../utils/unique-array';

/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
export default class TouchInput extends Input {
    evTarget = 'touchstart touchmove touchend touchcancel';
    targetIds = {};
    constructor() {
        super(...arguments);

        this.init();
    }

    handler(ev) {
        const type = TOUCH_INPUT_MAP[ev.type];
        const touches = this.getTouches(ev, type);
        if (!touches) return;

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
    getTouches(ev, type) {
        const allTouches = Array.from(ev.touches);
        const {targetIds} = this;

        // when there is only one touch, the process can be simplified
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }

        // get target touches from touches
        const targetTouches = allTouches.filter((touch) =>
            this.target.contains(touch.target)
        );

        // collect touches
        if (type === INPUT_START) {
            targetTouches.forEach((targetTouch) => {
                targetIds[targetTouch.identifier] = true;
            });
        }

        // filter changed touches to only contain touches that exist in the collected target ids
        const changedTargetTouches = [];
        Array.from(ev.changedTouches).forEach((changedTouch) => {
            if (targetIds[changedTouch.identifier]) {
                changedTargetTouches.push(changedTouch);
            }

            // cleanup removed touches
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouch.identifier];
            }
        });

        if (!changedTargetTouches.length) return;

        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        return [
            uniqueArray(
                targetTouches.concat(changedTargetTouches),
                'identifier',
                true
            ),
            changedTargetTouches
        ];
    }
}

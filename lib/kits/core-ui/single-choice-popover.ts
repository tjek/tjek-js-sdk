import Popover from './popover';

export default function singleChoicePopover(
    {
        items,
        el,
        header,
        x,
        y
    }: {items; el: HTMLElement; header?: string; x: number; y: number},
    callback
) {
    let popover: Popover | undefined;

    if (items.length === 1) {
        callback(items[0]);
    } else if (items.length > 1) {
        popover = new Popover({header, x, y, singleChoiceItems: items});

        popover.bind('selected', (e) => {
            callback(items[e.index]);

            popover?.destroy();
        });

        popover.bind('destroyed', () => {
            el.focus();
        });

        el.appendChild(popover.el);
        popover.render().el.focus();
    }

    return {
        destroy() {
            popover?.destroy();
        }
    };
}

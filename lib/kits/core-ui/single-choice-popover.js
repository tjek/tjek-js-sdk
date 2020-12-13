const Popover = require('./popover');

module.exports = function singleChoicePopover(ctx, callback) {
    const {items} = ctx;
    let popover = null;

    if (items.length === 1) {
        callback(items[0]);
    } else if (items.length > 1) {
        popover = new Popover({
            header: ctx.header,
            x: ctx.x,
            y: ctx.y,
            singleChoiceItems: items
        });

        popover.bind('selected', (e) => {
            callback(items[e.index]);

            popover.destroy();
        });

        popover.bind('destroyed', () => {
            ctx.el.focus();
        });

        ctx.el.appendChild(popover.el);
        popover.render().el.focus();
    }

    return {
        destroy() {
            popover?.destroy();
        }
    };
};

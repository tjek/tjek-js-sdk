export default class ComponentHelpers {
    constructor() {
        this.container = null;
        this.blocker = null;
        this.headNav = document.querySelector('.sgn__nav');
    }

    addBlockerListener() {
        this.blocker = document.createElement('div');
        this.blocker.className = 'sgn-blocker';
        this.insertAfter(this.headNav, this.blocker);
        this.blocker.addEventListener('click', this.destroy.bind(this), false);
    }

    destroy(e) {
        e.stopPropagation();
        this.blocker?.parentNode?.removeChild(this.blocker);
        this.container?.parentNode?.removeChild(this.container);
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    }

    // addWindowListener() {
    //     if (this.shown) {
    //         this.windowListener = this.processWindowClick.bind(this);
    //         window.addEventListener('click', this.windowListener, false);
    //     }
    // }

    // processWindowClick(e) {
    //     e.stopPropagation();
    //     if (!this.container.contains(e.target)) {
    //         this.shown = false;
    //         this.destroy();
    //     }
    // }

    // destroy() {
    //     window.removeEventListener('click', this.windowListener, false);
    //     this.container?.parentNode?.removeChild(this.container);
    // }
}

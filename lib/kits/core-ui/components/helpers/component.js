const componentHelper = {
    addBlockerListenerTo: (container, destroyCallback) => {
        const headNav = document.querySelector('.sgn__nav');
        const blocker = document.createElement('div');
        blocker.className = 'sgn-blocker';
        componentHelper.insertAfter(headNav, blocker);
        blocker.addEventListener(
            'click',
            (e) => {
                e.stopPropagation();

                blocker?.parentNode?.removeChild(blocker);
                container?.parentNode?.removeChild(container);

                if (typeof destroyCallback === 'function') {
                    destroyCallback(e);
                }
            },
            false
        );
    },
    insertAfter: (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    },
    insertInside: (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    },
    formatPrice: (price, localeCode = 'en-US', currency = 'USD') => {
        return new Intl.NumberFormat(localeCode, {
            style: 'currency',
            currency
        }).format(price);
    }
};

export default componentHelper;

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

                componentHelper.destroyModal(container);

                if (typeof destroyCallback === 'function') {
                    destroyCallback(e);
                }
            },
            false
        );
    },
    destroyModal: (container) => {
        const blocker = document.querySelector('.sgn-blocker');

        if (typeof container === 'string') {
            container = document.querySelector(`.${container}`);
        }

        blocker?.parentNode?.removeChild(blocker);
        container?.parentNode?.removeChild(container);
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
    },
    formatDate: (dateStr, localeCode = 'en-US', options = {}) => {
        const date = new Date(dateStr);

        return new Intl.DateTimeFormat(localeCode, options).format(date);
    }
};

export default componentHelper;

import fetch from 'cross-fetch';
import MicroEvent from '../../vendor/microevent';
import './incito.styl';

interface TjekEvent extends Event {
    detail: {
        type: string;
        payload: any;
    };
}

export default class Incito extends MicroEvent<{
    started: [];
    destroyed: [];
    sectionVisible: [{sectionId: string; sectionPosition: number}];
    sectionHidden: [{sectionId: string; sectionPosition: number}];
}> {
    containerEl: HTMLElement;
    publicationId: string;
    constructor(containerEl: HTMLElement, publicationId: string) {
        super();

        this.containerEl = containerEl;
        this.publicationId = publicationId;
    }

    start() {
        const apiKey = window.SGN.config.get('apiKey') as string;
        const coreUrl = window.SGN.config.get('coreUrl') as string;
        const urlParams = new URLSearchParams();

        if (apiKey) {
            urlParams.set('api_key', apiKey);
        }

        urlParams.set('context', 'standalone');
        urlParams.set('view_direction', 'vertical');
        urlParams.set('view_mode', 'continuous');
        urlParams.set('ui', 'none');

        window.addEventListener('tjek', (e: TjekEvent) => {
            if (e.detail.type === 'pageEntered') {
                this.trigger('sectionVisible', {
                    sectionId: String(
                        e.detail.payload.pageName ?? e.detail.payload.pageNumber
                    ),
                    sectionPosition: e.detail.payload.pageNumber
                });
            } else if (e.detail.type === 'pageExited') {
                this.trigger('sectionHidden', {
                    sectionId: String(
                        e.detail.payload.pageName ?? e.detail.payload.pageNumber
                    ),
                    sectionPosition: e.detail.payload.pageNumber
                });
            }
        });

        const baseUrl = coreUrl.includes('-staging')
            ? 'https://publication-viewer.tjek-staging.com'
            : 'https://publication-viewer.tjek.com';

        fetch(`${baseUrl}/v1/${this.publicationId}?${urlParams.toString()}`)
            .then((res) => {
                return res.text();
            })
            .then((html) => {
                this.containerEl.innerHTML = html;
                this.containerEl.querySelectorAll('script').forEach((x) => {
                    const sc = document.createElement('script');

                    sc.appendChild(document.createTextNode(x.innerText));

                    this.containerEl.appendChild(sc);
                });

                this.trigger('started');
            });
    }

    destroy() {
        this.trigger('destroyed');

        window.dispatchEvent(
            new CustomEvent('tjek', {
                detail: {
                    type: 'destroy'
                }
            })
        );

        setTimeout(() => {
            this.containerEl.innerHTML = '';
        }, 1);
    }
}

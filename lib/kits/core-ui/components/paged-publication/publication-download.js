import {request} from '../../../core';

export default class PublicationDownload {
    constructor({configs = {}}) {
        this.configs = configs;
        this.downloadBtn = document.querySelector('.sgn__offer-download');
        this.container = null;
    }

    render() {
        this.downloadBtn?.addEventListener(
            'click',
            this.downloadPdf.bind(this),
            false
        );
    }

    downloadPdf() {
        console.log('options', this.configs);
        return new Promise((resolve, reject) => {
            request(
                {
                    url: `/v2/catalogs/${this.configs.id}/download`
                },
                (err, catalog) => {
                    if (!err && catalog.pdf_url) {
                        resolve(catalog.pdf_url);
                    } else {
                        reject(err);
                    }
                }
            );
        }).then((url) => {
            window.open(url, '_blank')?.focus();
        });
    }
}

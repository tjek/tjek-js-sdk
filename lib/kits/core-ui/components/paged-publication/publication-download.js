import {request} from '../../../core';

const publicationDownload = ({configs = {}}) => {
    const downloadBtn = document.querySelector('.sgn__offer-download');

    const render = () => {
        downloadBtn?.addEventListener('click', downloadPdf, false);
    };

    const downloadPdf = () => {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: `/v2/catalogs/${configs.id}/download`
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
            location.href = url;
        });
    };

    return {render};
};

export default publicationDownload;

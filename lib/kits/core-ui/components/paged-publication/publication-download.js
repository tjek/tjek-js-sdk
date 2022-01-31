import {request} from '../../../core';

const PublicationDownload = ({configs = {}}) => {
    const downloadBtn = document.querySelector('.sgn__offer-download');

    const render = () => {
        downloadBtn?.addEventListener('click', downloadPdf, false);
    };

    const downloadPdf = async () => {
        const {pdf_url} = await request({
            url: `/v2/catalogs/${configs.id}/download`
        });

        location.href = pdf_url;
    };

    return {render};
};

export default PublicationDownload;

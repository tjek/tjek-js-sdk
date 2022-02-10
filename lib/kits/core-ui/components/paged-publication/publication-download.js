import {request} from '../../../core';

const PublicationDownload = ({configs}) => ({
    render: () => {
        document.querySelector('.sgn__offer-download')?.addEventListener(
            'click',
            async () => {
                const {pdf_url} = await request({
                    apiKey: configs.apiKey,
                    coreUrl: configs.coreUrl,
                    url: `/v2/catalogs/${configs?.id}/download`
                });

                location.href = pdf_url;
            },
            false
        );
    }
});

export default PublicationDownload;

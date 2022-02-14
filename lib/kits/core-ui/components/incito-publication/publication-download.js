import {request} from '../../../core';

const PublicationDownload = ({configs}) => ({
    render: () => {
        document.querySelector('.sgn__offer-download')?.addEventListener(
            'click',
            async () => {
                location.href = await request({
                    apiKey: configs.apiKey,
                    coreUrl: configs.coreUrl,
                    url: `/v2/catalogs/${configs?.id}/download`
                }).pdf_url;
            },
            false
        );
    }
});

export default PublicationDownload;

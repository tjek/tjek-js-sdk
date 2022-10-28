import Mustache from 'mustache';
import './page-decoration.styl';

const defaultTemplate = `\
{{#pageDecoration.website_link}}
<div class="sgn-pagedecoration__content">
    <a href="{{pageDecoration.website_link}}" rel="noreferrer noopener" target="_blank">
        <p class="sgn-pagedecoration-item__domain">{{pageDecoration.hostname}}</p>
    </a>
</div>
{{/pageDecoration.website_link}}\
`;

const PageDecoration = ({
    template,
    pages,
    pageDecoration
}: {
    template: HTMLElement | null;
    pages: [];
    pageDecoration: {
        page_number: number;
        title: string;
        website_link: string;
    };
}) => {
    const render = () => {
        const el = document.createElement('div');
        const position =
            pages?.length <= 1
                ? 'center'
                : pageDecoration.page_number % 2 == 0
                ? 'left'
                : 'right';

        el.classList.add('sgn-pagedecoration');
        el.classList.add(`sgn-pagedecoration-${position}`);
        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            pageDecoration: {
                ...pageDecoration,
                hostname: getHostname(pageDecoration?.website_link)
            }
        });

        return el;
    };

    const getHostname = (link = '') => {
        try {
            const url = new URL(link);

            return url.hostname;
        } catch (e) {
            return '';
        }
    };

    return {render};
};

export default PageDecoration;

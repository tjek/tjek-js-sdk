import Mustache from 'mustache';
import './main-container.styl';

const defaultTemplate = `\
<div class="sgn__publications">
    <ul class="sgn-publications-list-items-container">
        {{#publications}}
        <li class="sgn-publications-li">
            <div class="publications__item" data-id="{{id}}">
                <div class="sgn-publications-list-content-img">
                    <img data-id="{{id}}" src="{{images.view}}" alt="{{label}}">
                </div>
                <div class="sgn-publications-list-content-text">
                    <div class="sgn-publications-list-content-heading">
                        <span>{{label}}</span>
                    </div>
                    <div class="sgn-publications-list-content-date">
                        <span>{{dateFrom}}-{{dateTill}}</span>
                    </div>
                </div>
            </div>
        </li>
        {{/publications}}
    </u;>
</div>
<div id="sgn-publication-viewer-container"></div>
\
`;

const MainContainer = ({publications, template, el}) => {
    const render = () => {
        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            publications
        });
    };

    return {render};
};

export default MainContainer;

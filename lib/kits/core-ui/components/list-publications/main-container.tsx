import {Fragment, h, render as pRender} from 'preact';
import './main-container.styl';

const Template = ({publications}) => {
    return (
        <>
            <div class="sgn__publications">
                <ul class="sgn-publications-list-items-container">
                    {publications?.map((publication) => (
                        <li class="sgn-publications-li">
                            <div
                                class="publications__item"
                                data-id={publication.id}
                            >
                                <div class="sgn-publications-list-content-img">
                                    <img
                                        data-id={publication.id}
                                        src={publication.images.view}
                                        alt={publication.label}
                                    />
                                </div>
                                <div class="sgn-publications-list-content-text">
                                    <div class="sgn-publications-list-content-heading">
                                        <span>{publication.label}</span>
                                    </div>
                                    <div class="sgn-publications-list-content-date">
                                        <span>
                                            {publication.dateFrom}-
                                            {publication.dateTill}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="sgn-publication-viewer-container"></div>
        </>
    );
};

const MainContainer = ({publications, el}) => {
    const render = () => {
        pRender(<Template publications={publications} />, el);
    };

    return {render};
};

export default MainContainer;

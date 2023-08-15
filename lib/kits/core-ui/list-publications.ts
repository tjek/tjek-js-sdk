import MainContainer from './components/list-publications/main-container';
import IncitoPublication from './incito-publication';
import PagedPublication from './paged-publication';
import {transformScriptData} from './components/helpers/transformers';
import {getQueryParam} from '../../util';
import {request, V2Catalog} from '../core';
import {
    pushQueryParam,
    formatDate,
    transformFilter,
    getHashFragments,
    getPubState,
    parseDateStr
} from './components/helpers/component';
import type {Tracker} from '../events';

const ListPublications = (
    scriptEl: HTMLScriptElement,
    {
        mainContainer = '',
        apiKey,
        coreUrl,
        eventTracker
    }: {
        mainContainer: string;
        apiKey: string;
        coreUrl: string;
        eventTracker: Tracker;
    }
) => {
    const scriptEls = {
        ...transformScriptData(scriptEl, mainContainer),
        mainContainer:
            scriptEl.dataset.componentListPublicationsContainer ||
            mainContainer,
        orderBy: scriptEl.dataset.componentListPublicationsOrderBy,
        preferredViewer:
            scriptEl.dataset.componentPublicationsViewerPreferredType
    };

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-list-publications-template'
        )
    };

    const orderBys = {
        newest: '-publication_date',
        oldest: 'publication_date'
    };

    const options = {
        el: document.querySelector('.sgn__pp'),
        apiKey,
        coreUrl,
        eventTracker,
        businessId: scriptEls.businessId,
        orderBy: scriptEls.orderBy
            ? orderBys[scriptEls.orderBy]
            : orderBys.newest,
        requestFilter: scriptEls.requestFilter,
        clientFilter: scriptEls.clientFilter
    };

    let publications: ReturnType<typeof transformPublications> = [];

    const clickPublicationItem = (e) => {
        const {id} = e.currentTarget.dataset || {};
        const publication = findPublicationById(id);

        if (publication) {
            if (scriptEls.displayUrlParams?.toLowerCase() === 'query') {
                pushQueryParam({[scriptEls.publicationIdParam]: id});
            } else if (scriptEls.displayUrlParams?.toLowerCase() === 'hash') {
                location.hash = `${scriptEls.publicationHash}/${id}`;
            }

            dispatchPublicationClickEvent(publication);
            renderPublicationViewer(publication);
        }
    };

    const findPublicationById = (id: string) =>
        publications?.find((publication) => publication.id === id);

    const renderPublicationViewer = (
        publication: ReturnType<typeof transformPublications>[number]
    ) => {
        const {id, types} = publication;

        if (
            scriptEls.publicationsListClickBehavior ===
            'open_publication_viewer'
        ) {
            if (
                (scriptEls.preferredViewer === 'incito' &&
                    types.includes('incito')) ||
                !types.includes('paged')
            ) {
                const incitoPublication = IncitoPublication(scriptEl, {
                    mainContainer: '#sgn-publication-viewer-container',
                    apiKey,
                    coreUrl,
                    eventTracker
                });

                incitoPublication.setOptions({id});
                incitoPublication.render();
            } else {
                const pagedPublication = PagedPublication(scriptEl, {
                    mainContainer: '#sgn-publication-viewer-container',
                    apiKey,
                    coreUrl,
                    eventTracker
                });

                pagedPublication.setOptions({id});
                pagedPublication.render();
            }
        }
    };

    const addPublicationListener = () =>
        document.querySelectorAll('.publications__item').forEach((itemEl) => {
            itemEl.addEventListener('click', clickPublicationItem, false);
        });

    const dispatchPublicationClickEvent = (detail) => {
        document.querySelector(scriptEls.mainContainer)?.dispatchEvent(
            new CustomEvent('publication:clicked', {
                detail
            })
        );
    };

    const fetchPublications = async () =>
        transformPublications(
            await request<V2Catalog[]>({
                apiKey: options.apiKey,
                coreUrl: options.coreUrl,
                url: `/v2/catalogs`,
                qs: {
                    dealer_id: options.businessId,
                    order_by: options.orderBy,
                    offset: 0,
                    limit: 24,
                    types: 'paged,incito',
                    ...transformFilter(options.requestFilter)
                }
            })
        );

    const transformPublications = (publications?: V2Catalog[]) => {
        const filters = transformFilter(options.clientFilter);

        return (publications || [])
            .filter((publication) =>
                Object.entries(filters).reduce(
                    (prev, {0: key, 1: value}) =>
                        publication[key] === value && prev,
                    {}
                )
            )
            .map((publication) => ({
                ...publication,
                dateFrom: formatDate(publication?.run_from),
                dateTill: formatDate(publication?.run_till),
                status: getPubState(
                    publication?.run_from,
                    new Date(
                        Number(parseDateStr(publication?.run_till)) - 1000
                    ).toISOString()
                )
            }));
    };

    const render = async () => {
        publications = await fetchPublications();

        MainContainer({
            publications,
            template: customTemplates.mainContainer,
            el: document.querySelector(scriptEls.mainContainer)
        }).render();

        addPublicationListener();

        const paramPublicationId = getQueryParam(scriptEls.publicationIdParam);
        const hashPulicationId = getHashFragments(
            scriptEls.publicationHash
        )?.publicationId;
        let publication:
            | ReturnType<typeof transformPublications>[number]
            | undefined;
        if (paramPublicationId) {
            publication = findPublicationById(paramPublicationId);
        } else if (hashPulicationId) {
            publication = findPublicationById(hashPulicationId);
        }
        if (publication) renderPublicationViewer(publication);
    };

    return {render};
};

export default ListPublications;

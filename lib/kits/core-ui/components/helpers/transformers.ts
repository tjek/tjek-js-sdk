export const transformScriptData = (
    scriptEl: HTMLScriptElement,
    mainContainer: string
) => {
    const {dataset} = scriptEl;

    return {
        businessId: dataset.businessId,
        mainContainer: dataset.componentPublicationContainer || mainContainer,
        listPublicationsContainer:
            dataset.componentListPublicationsContainer || mainContainer,
        publicationId: dataset.componentPublicationId,
        publicationIdParam: dataset.publicationIdQueryParam || 'publicationid',
        pageIdParam: dataset.publicationPageQueryParam || 'publicationpage',
        publicationHash: dataset.publicationHash || 'publication',
        displayUrlParams: dataset.componentPublicationDisplayUrlParams,
        localeCode: dataset.localeCode,
        translationKeys: dataset.translationKeyIncito_publication_viewer,
        theme: dataset.componentTheme,
        publicationsListClickBehavior:
            dataset.componentPublicationsListItemClickBehavior ||
            'open_publication_viewer',
        offerClickBehavior:
            dataset.componentPublicationViewerOfferClickBehavior ||
            'shopping_list',
        disableShoppingList:
            dataset.componentPublicationDisableShoppingList === 'true',
        disableClose: dataset.componentPublicationDisableClose === 'true',
        disableMenu: dataset.componentPublicationDisableMenu === 'true',
        disableDownload: dataset.componentPublicationDisableDownload === 'true',
        disableHeader: dataset.componentPublicationDisableHeader === 'true',
        disableGlobalScrollbar:
            dataset.componentPublicationDisableGlobalScrollbar === 'true',
        showHeaderLabels:
            dataset.componentPublicationShowHeaderLabels === 'true',
        enableSidebar: dataset.componentPublicationEnableSidebar === 'true',
        sidebarPosition:
            dataset.componentPublicationSidebarPosition === 'left'
                ? 'left'
                : 'right'
    };
};

export const transformScriptData = (scriptEl, mainContainer) => {
    const {dataset} = scriptEl;

    return {
        businessId: dataset.businessId,
        mainContainer: dataset.componentPublicationContainer || mainContainer,
        publicationId: dataset.componentPublicationId,
        publicationIdParam: dataset.publicationIdQueryParam || 'publicationid',
        pageIdParam: dataset.publicationPageQueryParam || 'page',
        localeCode: dataset.localeCode,
        translationKeys: dataset.translationKeyIncito_publication_viewer,
        theme: dataset.componentTheme,
        offerClickBehavior:
            dataset.componentPublicationViewerOfferClickBehavior ||
            'shopping_list',
        disableShoppingList:
            dataset.componentPublicationDisableShoppingList === 'true',
        disableClose: dataset.componentPublicationDisableClose === 'true',
        disableMenu: dataset.componentPublicationDisableMenu === 'true',
        disableDownload: dataset.componentPublicationDisableDownload === 'true',
        disableHeader: dataset.componentPublicationDisableHeader === 'true',
        overrideGlobalScrollbar:
            dataset.componentPublicationOverrideGlobalScrollbar === 'true'
    };
};

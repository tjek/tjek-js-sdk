# Incito Integration Guide

## Introduction

Incitos are generated via code utilizing [Shopgun SDK](https://www.npmjs.com/package/shopgun-sdk). In short, the integration code consists of two major steps:

- Fetch catalog model/payload to display from our API
- Generate Incito (view) under specified HTML element
- Handle Incito interactivity

_**Note:** Our implementation does **not** generate `<iframe>` elements making integration way easier for web developers. This, of course, presents challenges that are discussed bellow._

---

## Quick guide

In this section the steps required to display an Incito from start to finish are presented. The more visual types may check the examples under the [examples](./incito_examples/) folder.

### **(1)** Include Shopgun SDK

You may choose to either include the project from `npm` _or_ use our CloudFront distribution.

1. **Compile JS found in `npm`:**

    In case you include our code and compile/minify with your application code, you will need an extra step that will configure the SDK with your app key and track id:

    ```JS
    const shopgunAppConfig = {
        apiKey: 'YOUR_API_KEY',
        eventTracker: new SGN.EventsKit.Tracker(trackId: 'YOUR_TRACK_ID')
    };

    SGN.config.set(shopgunAppConfig);
    ```

2. **Include using `<link>` & `<script>`**

    If you include our code from separate nodes you may want to include your app key & track id as seen below. The example below uses our CloudFront distribution where all the versions are hosted:

    ```HTML
    <link href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.css" rel='stylesheet' />

    <script src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.js" id="sgn-sdk" data-api-key="YOUR_APP_KEY" data-track-id="YOUR_TRACK_ID"></script>
    ```

    You may use our distribution or choose to host the code yourself. Should you choose to use our distribution remember to point to the latest working version.

### **(2)** Fetch catalog

This step is using the API to fetch the catalog to be displayed. This is normally done through the `/v2/catalogs/` route.

You may either directly fetch a specific catalog like so:

```JS
const catalog = await SGN.CoreKit.request({
    url: '/v2/catalogs/CATALOG_ID',
    qs: {dealer_id: 'DEALER_ID'}
});
```

Another option is to fetch the latest catalogs and choose using your logic, or just get the first element which will be the latest catalog, *meaning the catalog that is valid from the latest date, and secondary created the latest.*

```JS
const catalogs = await SGN.CoreKit.request({
    url: '/v2/catalogs',
    qs: {
        dealer_id: 'DEALER_ID',
        order_by: '-valid_date',
        types: 'incito',
        offset: 0,
        limit: 4
    }
});
```

### **(3)** Generate Incito bootstrapper

Given the catalog payload from the previous step, and an HTML node that is going to act as the root of the Incito view, next up is generating an Incito bootstrapper:

```JS
const incitoRootElement = document.querySelector('#incito__publication');
const incitoPublication = new SGN.IncitoPublicationKit.Bootstrapper({
    el: incitoRootElement,
    id: catalog.id,
    eventTracker: SGN.config.get('eventTracker')
});
```

### **(4)** Fetch Incito payload

Next step will make the API call to fetch the Incito payload for the specified catalog:

```JS
const incito = await incitoPublication.fetchIncito(catalog.incito_publication_id);
```

### **(5)** Generate Incito view

Now there is enough data to generate the Incito view, under the HTML node specified in step **(3)**:

```JS
const incitoViewer = incitoPublication.createViewer({
    details: catalog,
    incito: incito
});

incitoViewer.start();
```

### **(6)** Set interactivity

In this, optional, step, a number of enchantments are presented:

1. Click event:

    ```JS
    // Listen to click events on offer nodes under incitoRootElement
    SGN.CoreUIKit.on(incitoRootElement, 'click', '.incito__view[data-role="offer"]', (e) => {
        e.preventDefault();

        const id = this.getAttribute('data-id'); // Get offer ID
        const meta = incitoPublicationViewer.incito.ids[id];  // Get offer metadata
    });
    ```

    The offer metadata (`meta` variable above) can be used to add interactivity such as open offer link, add the offer to your applications shopping cart/list, or present a more detailed popup view for the offer.

### **(7)** Common issues

1. CSS issues:

    One of the most common issues due to the nature of the Incito view is CSS properties bleeding into the Incito view. It is advised to compare the Incito view in our CMS/Studio and compare it to your integration to find such errors.

---

## Examples

Under [the examples folder](./incito_examples/) are two HTML files ([index.html](./incito_examples/index.html) & [index-pro.html](./incito_examples/index-pro.html)) that reference two different Javascript files ([incito-sample.js](./incito_examples/js/incito-sample.js) & [incito.js](./incito_examples/js/incito.js)) respectively.

**NOTE:** Both HTML and JS files require some configuration before they can work; There are TODOs inside them asking you to fill in your information (`app-id`, `track-id`, `business-id` & `catalog-id`).

When configured, the HTML files can be tested locally, as long as they are served by a local server.

1. **index.html:**
    This provides a stripped down version of integration. It will fetch the latest incito publication and display it.

2. **index-pro.html:**
    This is a version with a few features, plus some comments in the JS file on adding other features. To provide a different example, we fetch a specific, hardcoded, incito publication in this one.
    Clicking on offers display a view under them with the provided description and a button link to open the offer url (if available).

### On integrating Incito to your website

We strongly recommend that you use the files only for testing purposes and integrate the code into your application as you see fit. The only real requirement is that the page has loaded and nodes (#incito__publication etc) found in the HTML files are in the DOM tree and accessible before running the loadIncito function (or your customized function).

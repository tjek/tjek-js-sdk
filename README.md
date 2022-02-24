# ShopGun JavaScript SDK

[![Build Status](https://travis-ci.org/shopgun/shopgun-js-sdk.svg?branch=develop)](https://travis-ci.org/shopgun/shopgun-js-sdk)
[![npm version](https://badge.fury.io/js/shopgun-sdk.svg)](https://badge.fury.io/js/shopgun-sdk)

This SDK works both client-side in your browser but also server-side in a Node.js environment.

## Creating an App

First, you need to [create a ShopGun app](https://shopgun.com/developers/apps) allowing you to make API requests. You will be prompted to create a new user first.

> We recommend creating 2 apps: 1 for production and another for development. This ensures environments aren't mixed.

## Setup

### In the Browser

The SDK makes use of both JavaScript and CSS so you need to load two resources in the browser:

```html
<link
    href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.css"
    rel="stylesheet"
    type="text/css"
/>
<script
    src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.js"
    id="sgn-sdk"
    data-api-key="YOUR_API_KEY"
    data-track-id="YOUR_TRACK_ID"
></script>
```

By defining your app key and track identifier as data attributes when including the JavaScript file the SDK auto-configures itself. You can find the app key and track identifier in the [developer console](https://shopgun.com/developers/apps).

### In Node.js

We recommend you use npm to install the SDK. To install, simply type the following into a terminal window:

```
npm install shopgun-sdk
```

When installed you can require and configure the SDK:

```javascript
SGN = require('shopgun-sdk');

SGN.config.set({
    apiKey: 'YOUR_API_KEY'
});
```

We recommend using environment variables for the config to avoid having secrets in your code base:

```javascript
SGN.config.set({
    apiKey: process.env.SHOPGUN_API_KEY
});
```

## Paged Publications

To provide your users with a viewing experience for PDF's you need to use our PagedPublicationKit. We've built an [example](https://shopgun.github.io/shopgun-js-sdk/examples/paged-publication.html) that shows how it can work.

## More Platforms

To learn more about integrating the same experience on iOS and Android be sure to check out the respective SDK's:

-   [ShopGun iOS SDK](https://github.com/shopgun/shopgun-ios-sdk)
-   [ShopGun Android SDK](https://github.com/shopgun/shopgun-android-sdk)

## Core UI

To minimize the effort needed in setting this up, we've created some built-in (customizable) templates to list and view your publications.

### Setup

The setup is almost the same from above, you need to include the CSS and Javascript libraries. However, instead of creating an extra script to render the publication viewer, you only need to add a container and a few more required data-\* attributes to render the template. Eg:

```html
<link
    href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.css"
    rel="stylesheet"
    type="text/css"
/>

<div id="paged-publication"></div>

<script
    data-readme="API's and SDK's by Tjek (https://tjek.com)"
    src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.js"
    id="sgn-sdk"
    data-api-key="YOUR_API_KEY"
    data-track-id="YOUR_TRACK_ID"
    data-business-id="YOUR_BUSINESS_ID"
    data-component="paged-publication-viewer"
    data-component-publication-container="#paged-publication"
    defer
></script>
```

Below is another example which will render the list of active publications. It will also render the publication viewer upon clicking on a certain publication:

```html
<link
    href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.css"
    rel="stylesheet"
    type="text/css"
/>

<div id="list-publications"></div>

<script
    data-readme="API's and SDK's by Tjek (https://tjek.com)"
    src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.js"
    id="sgn-sdk"
    data-api-key="YOUR_API_KEY"
    data-track-id="YOUR_TRACK_ID"
    data-business-id="YOUR_BUSINESS_ID"
    data-component="list-publications"
    data-component-list-publications-container="#list-publications"
    defer
></script>
```

### Available data attributes

Aside from the required data- attributes, the SDK still support a few more data for customizations

| Attribute                                              | Value                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-business-id                                       | Business ID                                                                                                                                                                                                                                                                                                                         |
| data-component                                         | `paged-publication-viewer` : To render (default: latest) paged publication viewer<br/>`incito-publication-viewer` : To render incito publication viewer<br/>`list-publications` : To render the list of active publications.                                                                                                        |
| data-component-list-publications-container             | `#custom_container_id` <br/> `.custom_container_class`                                                                                                                                                                                                                                                                              |
| data-component-publication-container                   | `#custom_container_id` <br/> `.custom_container_class`                                                                                                                                                                                                                                                                              |
| data-component-list-publications-order-by              | `newest` (default) <br/>`oldest`                                                                                                                                                                                                                                                                                                    |
| data-component-publication-id                          | `{publication_id}` : To render specific publication                                                                                                                                                                                                                                                                                 |
| data-locale-code                                       | `en_US` (default) <br/>`da_DK`                                                                                                                                                                                                                                                                                                      |
| data-component-theme                                   | `light` (default)<br/> `dark`                                                                                                                                                                                                                                                                                                       |
| data-publication-id-query-param                        | `id` (default) : The page publication viewer can accept query param to display a certain publication. This is to override the default `id` param                                                                                                                                                                                    |
| data-publication-page-query-param                      | `page` (default) : The page publication viewer can accept query param to initially load a certain page. This is to override the default `page` param                                                                                                                                                                                |
| data-translation-keys--{key}                           | `{key}` : Any value that will replace the default value per key from the locale files                                                                                                                                                                                                                                               |
| data-component-publication-viewer-offer-click-behavior | `shopping_list` (default) : Offer will be added to shopping list<br/> `redirect_to_webshop_link` : Clicking an offer will redirect to webshop link; Shopping list will be disabled automatically<br/>`open_webshop_link_in_tab` : Clicking an offer will open webshop link in new tab; Shopping list will be disabled automatically |
| data-component-publication-disable-shopping-list       | `false` (default)<br/> `true`                                                                                                                                                                                                                                                                                                       |
| data-component-publication-disable-close               | `false` (default)<br/> `true`                                                                                                                                                                                                                                                                                                       |
| data-component-publication-disable-menu                | `false` (default)<br/> `true`                                                                                                                                                                                                                                                                                                       |
| data-component-publication-disable-download            | `false` (default)<br/> `true`                                                                                                                                                                                                                                                                                                       |
| data-component-publication-disable-header              | `false` (default)<br/> `true`                                                                                                                                                                                                                                                                                                       |
| data-component-list-publications-request-filter        | eg: `r_lat:59.9139,r_lng:10.7522` <br/> Filter on request level - key:value and is separated by comma                                                                                                                                                                                                                               |
| data-component-list-publications-client-filter         | eg: `all_stores:true` <br/> Filter on client side level - key:value and is separated by comma                                                                                                                                                                                                                                       |

## Changelog

### Version 4.0.2

-   Remove `incito-browser` hyphenation behavior to prevent line-breaks in offer details
-   Update dependencies

### Version 4.0.1

-   Semanatic masked versions are now published on our CDN, this means that you can get all versions of the SDK until we make a breaking change and change the major version like so: https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-4.x.x.min.js
-   Update dependencies
-   Fix Incito `data-link` behavior.

### Version 4.0.0

-   Updated the `incito-browser` library with new and speedy rendering + added `HTMLEmbedView`
-   Removed sessions from `CoreKit`
-   Removed some unused config settings such as `locale` and `appSecret`
-   Removed unused code

### Version 3.5.0

-   Update the `incito-browser` libary with new `HTMLView` that adds support for a more complex view component through the use of a style property for valid css style-attributes.

### Version 3.4.0

-   Internal refactor to vanilla JS

    No breaking changes anticipated but a minor version bump to avoid automagic patches, just in case.

### Version 3.3.3

-   IncitoPublicationKit: Updated `incito-browser` to 1.1.37

### Version 3.3.1

-   PagedPublicationKit: Will now use zoom-size images for pages prior to zooming in, when the physical pixel width of the page would be presented as over 700 pixels wide.

### Version 3.1.1

-   IncitoPublicationKit: Removed sessionStorage caching due to excessive JSON.parse JSON.stringify operations, which slows down the browser.

### Version 3.1.0

-   PagedPublicationKit: Add a new optional createViewer option `pickHotspot`, which is called when the user presses an intersection of several hotspots. This replaces the default picker popover element. API example:

```javascript
var viewer = bootstrapper.createViewer(data, {
    pickHotspot: function (
        // array of hotspots
        hotspots,
        // event that contains some metadata about the clicked page, viewer and click position
        // viewerEvent.verso.x and viewerEvent.verso.y are useful for positioning a picker relative to the viewer
        viewerEvent,
        // reference to the viewer DOM mounting point, useful for inserting a picker and positioning relatively inside of
        viewerElement,
        // you can use callback(hotspot) to emit a regular clicked/pressed/contextmenu event with a chosen hotspot
        callback
    ) {
        // Example: just always pick the first hotspot and callback to regular 'hotspot*' event behavior
        callback(hotspots[0]);

        // you can optionally return a clean-up function that will be called when
        // a picker should be closed, so you can clean up after yourself.
        // This clean-up function is called once on a subsequent pickHotspot call.
        return function () {
            console.log('clean up');
        };
    }
});
```

### Version N.E.X.T

-   Let CoreUIKit OfferDetails grow beyond the width of its anchor, with respect to on-screen position.

### Version 3.0.0

-   _BREAKING INCITO CHANGE_ Now, you need to supply the identifier of the publication rather than the Incito identifier. Plus, we've added a new event to measure how many times Incito's are opened. Anonymously.

### Version 2.3.19

-   PagedPublicationKit: Let options be passed to Viewer when calling createViewer, like so: `bootstrapper.createViewer(data, { pageSpreadMaxZoomScale: 1 });`

### Version 2.3.17

-   Make sure PagedPublicationViewer controls are destroy()'ed properly with the viewer, event handlers and all
-   Internal removal of some extraneous function binding _Breaking Change:_ If you relied on `this` in bootstrapper.fetch() callback, it no longer refers to the bootstrapper instance.

### Version 2.3.16

-   Fix broken PagedPublicationViewer startup

### Version 2.3.15

-   Update dependencies, including a fix for PagedPublicationViewer multiple starts via verso-browser https://github.com/shopgun/verso-browser/commit/81d95da1b1d0b26685fffd968bbbea8694252997

### Version 2.3.8

-   Roll back to core-js 2

### Version 2.3.7

-   Update verso-browser and incito-browser
-   Fix an issue where polyfills were missing

### Version 2.3.0

-   Introduce support for incito opened event in eventTracker
-   Use new incito opened event in IncitoPublicationKit
-   Add option to IncitoPublicationKit.Viewer to pass in a pagedPublicationId to be included in the incito opened event, this should be used when a user is known to already have seen the Paged Publication version of an Incito Publication.

### Version 2.2.11

-   Use cross-fetch library for making requests in browsers and node.js
-   Relaxed eventTracker requirement for PagedPublicationKit

### Version 2.2.8

-   Updated progress indicator for IncitoPublicationKit to be more visible and more like the one in PagedPublicationKit

### Version 2.2.5

-   Set async to true for requests

### Version 2.2.4

-   Added ability to use EventsKit tracker in a node.js context

### Version 2.2.3

-   Added promise return values to `SGN.CoreKit.request` and `SGN.CoreKit.request` calls without callback, when supported.

### Version 2.2.0

-   Changed the event tracker to use the new private event format. This also means you need to update your track identifier, which is now visible in the developer console on shopgun.com/developers.

### Version 2.1.0

-   Updated Incito library. Now, it's up to you to add event delegation to Incito rather than binding e.g. `view_clicked` to the Incito viewer. This gives you way more flexibility
-   Split JS and CSS into separate files for Incito Publication demo
-   Removed `util.isElementInViewport`

### Version 2.0.9

-   Added `margins` parameter for `util.isElementInViewport`
-   Updated Incito library

### Version 2.0.0

-   PagedPublicationKit
    -   Refactored `SGN.PagedPublicationKit.initialize` to `SGN.PagedPublication.Bootstrapper` to split fetching and rendering of the viewer
    -   Made hotspots into a function instead of having a setting called `showHotspots`
-   Introduced IncitoPublicationKit
-   Removed unused files
-   Fixed incorrect positioning of hotspots and hotspot picker in Internet Explorer
-   Added CoreUIKit to core UI components such as a popover

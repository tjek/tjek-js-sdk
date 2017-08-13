# ShopGun JavaScript SDK [![Build Status](https://travis-ci.org/shopgun/shopgun-js-sdk.svg?branch=develop)](https://travis-ci.org/shopgun/shopgun-js-sdk)

This SDK works both client-side in your browser but also server-side in a node.js environment.

## Installing

### In the Browser

The SDK makes use of both JavaScript and CSS so you need to load two resources in the browser:

```html
<link href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-1.1.14.min.css" rel="stylesheet" type="text/css">
<script id="sgn-sdk" src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-1.1.14.min.js"></script>
```

### In Node.js

We recommend you use npm to install the SDK. To install, simply type the following into a terminal window:

```
npm install shopgun-sdk
```

### Bower

If you can't use npm you can make use of Bower to install the SDK by typing the following into a terminal window:

```
bower install shopgun-sdk
```

## Configuration

To configure the SDK you just do:

```javascript
SGN.config.set({
    appKey: 'YOUR_APP_KEY'
});
```

Possible options are:

- `appKey`: The application key.
- `appSecret`: The application secret (only needed in node.js).
- `eventTracker`: The instance of an event tracker.
- `locale`: The preferred language in `ll_CC` format (e.g. `da_DK`).

## Kits

A kit is a set of standalone functionality.

### PagedPublicationKit

PagedPublicationKit is a way to make a stellar reading experience for traditional PDF publications. It's rendered directly in the DOM, has full event tracking, and is very customizable. We've built a demo of the kit showing it in action:

https://shopgun.github.io/shopgun-js-sdk/paged-publication.html

We recommend you checking out our [integration guide](/INTEGRATION.md) on how to get started using the kit.

### GraphKit

The GraphKit gives you access to the ShopGun Graph API, which is a GraphQL engine. To see which queries and mutations are possible, please go to our [GraphiQL](https://graph.service.shopgun.com) site. To make a request against the Graph API you simply run `SGN.GraphKit.request` like so:

```javascript
SGN.GraphKit.request({
    query: 'query PlanningSuggestions($locale: Locale!, $term: String!) {\
      planningSuggestions(locale: $locale, term: $term) {\
        phrases {\
          name\
        }\
      }\
    }',
    operationName: 'PlanningSuggestions',
    variables: {
        locale: 'en_US',
        term: 'c'
    }
}, function (err, response) {
    console.log(err, response);
});
```

### CoreKit

The CoreKit allows you to make requests against our [Core API](http://docs.api.etilbudsavis.dk). Here's an example query:

```javascript
SGN.CoreKit.request({
    url: '/v2/catalogs'
}, function (err, data) {
    console.log(err, data);
});
```

To include geolocation you can do:

```javascript
SGN.CoreKit.request({
    geolocation: {
        latitude: 55.6760968,
        longitude: 12.5683371,
        radius: 100000,
        sensor: true
    },
    url: '/v2/catalogs'
}, function (err, data) {
    console.log(err, data);
});
```

The supported options are:

- `method`: A string defining the HTTP verb (get, post, put, delete).
- `url`: A string defining the relative URL to the Core API.
- `qs`: An object for adding query params.
- `body`: An object defining the body. Make sure to set the right headers.
- `headers`: An object defining the request headers.
- `geolocation`: An object defining the geolocation properties.

### EventsKit

The EventsKit allows you to track user behavior to make it easier to measure how well your product and content are performing. You can both register official ShopGun events but also custom events. The EventsKit is only available client-side. First, you need to make a tracker:

#### Tracker

```javascript
var eventTracker = new SGN.EventsKit.Tracker({
    trackId: 'YOUR_TRACK_ID'
});
```

Then you track using the `eventTracker.trackEvent` function. It takes 3 arguments:

- `type`: A string defining the event type.
- `properties`: An object defining the properties related to the event type.
- `version`: A string defining the event type version.

To track custom events you simply prefix events with `x-`:

```javascript
eventTracker.trackEvent('x-something-happened', { buttonX: true }, '1.0.0');
```

#### Pulse

Pulse gives you the pulse on Shopgun streaming real-time activity via a WebSocket. It can be used in a wide variety of applications such as decorating your office with a screen showing where people interact with your publications. We've built a demo that visualizes the activity:

https://shopgun.github.io/shopgun-js-sdk/pulse.html

## Changes

* *Version 1.1.14* - Paged Publication Widget

    - *Widget:* Without any JavaScript it's possible to embed a paged publication.

    - *Breaking change:* PagedPublicationKit.Main has been replaced by PagedPublicationKit.initialize

* *Version 1.1.8* - Pulse

    - *Pulse:* Pulse is a small API that shows the activity on ShopGun in real-time using a WebSocket.

    - *Documentation:* Added INTEGRATION.md that documents how to get the JS SDK up and running on your website.

    - *CoreKit bug:* If no URL was provided to `SGN.CoreKit.request` it would use the url `https://api.etilbudsavis.dkundefined`. It will now use the URL `https://api.etilbudsavis.dk`.

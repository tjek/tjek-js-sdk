# ShopGun JavaScript SDK [![Build Status](https://travis-ci.org/shopgun/shopgun-js-sdk.svg?branch=develop)](https://travis-ci.org/shopgun/shopgun-js-sdk)

This SDK works both client-side in your browser but also server-side in a node.js environment.

## Installing

### In the Browser

The SDK makes use of both JavaScript and CSS so you need to load two resources in the browser:

```html
<link rel="stylesheet" type="text/css" href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-1.0.0.min.css">
<script src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-1.0.0.min.js"></script>
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
- `locale`: The preferred language.

## PagedPublicationKit

See `kitchensink/kits/paged_publication/basic.html` for how to interact with this kit.

## GraphKit

The GraphKit gives you access to the ShopGun Graph API, which is a GraphQL engine. To see which queries and mutations are possible, please go to our [GraphiQL](https://graph.service.shopgun.com) site. To make a request against the Graph API you simply instantiate `SGN.GraphRequest` like so:

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

## CoreKit

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

## EventsKit

The EventsKit allows you to track user behavior to make it easier to measure how well your product and content are performing. You can both register official ShopGun events but also custom events. The EventsKit is only available client-side. First, you need to make a tracker:

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

# ShopGun JavaScript SDK

This SDK works both client-side in your browser but also server-side in a node.js environment.

## Configuration

To configure the SDK you just do:

```javascript
SGN.config.set({
    appKey: 'YOUR_APP_KEY'
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

## PagedPublicationKit

See `kitchensink/kits/paged_publication/basic.html` for how to interact with this kit.

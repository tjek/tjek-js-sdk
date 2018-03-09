# ShopGun JavaScript SDK [![Build Status](https://travis-ci.org/shopgun/shopgun-js-sdk.svg?branch=develop)](https://travis-ci.org/shopgun/shopgun-js-sdk)

This SDK works both client-side in your browser but also server-side in a Node.js environment.

## Creating an App

First, you need to [create a ShopGun app](https://business.shopgun.com/developers/apps) allowing you to make API requests. You will be prompted to create a new user first.

> We recommend creating 2 apps: 1 for production and another for development. This ensures environments aren't mixed. 

## Setup

### In the Browser

The SDK makes use of both JavaScript and CSS so you need to load two resources in the browser:

```html
<link href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-2.0.19.min.css" rel="stylesheet" type="text/css">
<script src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-2.0.19.min.js" id="sgn-sdk" data-app-key="YOUR_APP_KEY" data-track-id="YOUR_TRACK_ID"></script>
```

By defining your app key and track identifier as data attributes when including the JavaScript file the SDK auto-configures itself.

### In Node.js

We recommend you use npm to install the SDK. To install, simply type the following into a terminal window:

```
npm install shopgun-sdk
```

When installed you can require and configure the SDK:

```javascript
SGN = require('sgn-sdk');

SGN.config.set({
    appKey: 'YOUR_APP_KEY',
    appSecret: 'YOUR_APP_SECRET'
});
```

We recommend using environment variables for the config to avoid having secrets in your code base:

```javascript
SGN.config.set({
    appKey: process.env.SHOPGUN_APP_KEY,
    appSecret: process.env.SHOPGUN_APP_SECRET
});
```

## Paged Publications

To provide your users with a viewing experience for PDF's you need to use our PagedPublicationKit. We've built an [example](/dist/paged-publications.html) that shows how it can work.

## More Platforms

To learn more about integrating the same experience on iOS and Android be sure to check out the respective SDK's:

* [ShopGun iOS SDK](https://github.com/shopgun/shopgun-ios-sdk)
* [ShopGun Android SDK](https://github.com/shopgun/shopgun-android-sdk)

## Changelog

### Version 2.0.9

- Added `margins` parameter for `util.isElementInViewport`
- Updated Incito library

### Version 2.0.0

- PagedPublicationKit
    - Refactored `SGN.PagedPublicationKit.initialize` to `SGN.PagedPublication.Bootstrapper` to split fetching and rendering of the viewer
    - Made hotspots into a function instead of having a setting called `showHotspots`
- Introduced IncitoPublicationKit
- Removed unused files
- Fixed incorrect positioning of hotspots and hotspot picker in Internet Explorer
- Added CoreUIKit to core UI components such as a popover

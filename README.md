# ShopGun JavaScript SDK [![Build Status](https://travis-ci.org/shopgun/shopgun-js-sdk.svg?branch=develop)](https://travis-ci.org/shopgun/shopgun-js-sdk)

This SDK works both client-side in your browser but also server-side in a Node.js environment.

## Creating an App

First, you need to [create a ShopGun app](https://business.shopgun.com/developers/apps) allowing you to make API requests. You will be prompted to create a new user first.

> We recommend you creating 2 apps: 1 for production and another for development. This ensures environments aren't mixed. 

## Setup

### In the Browser

The SDK makes use of both JavaScript and CSS so you need to load two resources in the browser:

```html
<link href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-1.1.32.min.css" rel="stylesheet" type="text/css">
<script src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-1.1.32.min.js" id="sgn-sdk" data-app-key="YOUR_APP_KEY" data-track-id="YOUR_TRACK_ID"></script>
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

## PDF Viewer

To provide your users with a PDF viewing experience you need to use our PagedPublicationKit. We've built an [example](/dist/paged-publications.html) that shows how it works where you can inspect the source code.

## Multiplatform

To learn more about integrating the same experience on iOS and Android be sure to check out the respective SDK's:

* [ShopGun iOS SDK](https://github.com/shopgun/shopgun-ios-sdk)
* [ShopGun Android SDK](https://github.com/shopgun/shopgun-android-sdk)

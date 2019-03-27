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
  href="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-2.3.6.min.css"
  rel="stylesheet"
  type="text/css"
/>
<script
  src="https://d21oefkcnoen8i.cloudfront.net/sgn-sdk-2.3.6.min.js"
  id="sgn-sdk"
  data-app-key="YOUR_APP_KEY"
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

To provide your users with a viewing experience for PDF's you need to use our PagedPublicationKit. We've built an [example](https://shopgun.github.io/shopgun-js-sdk/paged-publication.html) that shows how it can work.

## More Platforms

To learn more about integrating the same experience on iOS and Android be sure to check out the respective SDK's:

- [ShopGun iOS SDK](https://github.com/shopgun/shopgun-ios-sdk)
- [ShopGun Android SDK](https://github.com/shopgun/shopgun-android-sdk)

## Changelog

### Version NEXT

- 📦 Internal restructure for ES6 modules, this makes the main bundle a little lighter but more importantly lets us do cool things like:
- 💥 Make SGN.EventsKit.Tracker available as a standalone module, to enjoy this you can `import Tracker from 'shopgun-sdk/kits/events/tracker';`. This will be a first in a more long-term effort to make the SDK useful to those who don't need the whole thing(which sits at a hefty 56kB minified and gzipped!) and are willing to give up the convenience of the primary singleton-based usage.

### Version 2.3.8

- Roll back to core-js 2

### Version 2.3.7

- Update verso-browser and incito-browser
- Fix an issue where polyfills were missing

### Version 2.3.0

- Introduce support for incito opened event in eventTracker
- Use new incito opened event in IncitoPublicationKit
- Add option to IncitoPublicationKit.Viewer to pass in a pagedPublicationId to be included in the incito opened event, this should be used when a user is known to already have seen the Paged Publication version of an Incito Publication.

### Version 2.2.11

- Use cross-fetch library for making requests in browsers and node.js
- Relaxed eventTracker requirement for PagedPublicationKit

### Version 2.2.8

- Updated progress indicator for IncitoPublicationKit to be more visible and more like the one in PagedPublicationKit

### Version 2.2.5

- Set async to true for requests

### Version 2.2.4

- Added ability to use EventsKit tracker in a node.js context

### Version 2.2.3

- Added promise return values to `SGN.CoreKit.request` and `SGN.CoreKit.request` calls without callback, when supported.

### Version 2.2.0

- Changed the event tracker to use the new private event format. This also means you need to update your track identifier, which is now visible in the developer console on shopgun.com/developers.

### Version 2.1.0

- Updated Incito library. Now, it's up to you to add event delegation to Incito rather than binding e.g. `view_clicked` to the Incito viewer. This gives you way more flexibility
- Split JS and CSS into separate files for Incito Publication demo
- Removed `util.isElementInViewport`

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

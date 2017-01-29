# Nightlife Coordination App

## Overview

This app allows users to search for local venues, indicate their attendance, get directions
and see each venues Yelp rating. The client leverages Angular v2.x and Typescript backed by 
a Node.js REST API and MongoDB datastore.

A demo version of this app is deployed at: [https://angular-nightlife.herokuapp.com](https://angular-nightlife.herokuapp.com)

![](client/assets/image/app-screenshot.png?raw=true)

This project was built as part of the Free Code Camp cirriculum based 
on the following user stories:

* As an unauthenticated user, I can view all bars in my area.
* As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
* As an authenticated user, I can remove myself from a bar if I no longer want to go there.
* As an unauthenticated user, when I login I should not have to search again.

## Install

Clone this repository and install npm dependencies:

```
git clone git@github.com:cjsheets/angular-nightlife-app.git
cd angular-nightlife-app
npm install
```

### Setup API Access 

To access the Yelp API (v3, Fusion), [you'll need a key](https://www.yelp.com/developers/documentation/v3). Once registered, create
`/client/environment/environment.ts` and add your key:

```
export const environment = {
  production: false,
  api_url: 'http://localhost:5000',
  yelp: {
    expires_in: 123456789,
    token_type: 'Bearer',
    access_token: 'xxxxxxxxxxxxxxxxxxxxxxx'
  }
};
```

To leverage social media authentication, you'll need to register for developer tokens from
[Twitter](https://apps.twitter.com/),
[Facebook](https://developers.facebook.com/),
[Google](https://console.cloud.google.com/apis/credentials?project=angular-nightlife),
[GitHub](https://github.com/settings/developers), etc. Once registered, create
`/server/config/environment/development.env.js` from `production.env.js` and add keys where indicated.

## Run

First, start the Node.js server in development mode:

```
npm run express-dev
```

Then build and run the client:

```
npm start
```

Navigate to `http://localhost:3000`


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Technology Stack

This package contains:

| Front-End | Back-End |
| ------- | ------- |
| Angular v2.x | Node.js |
| Meteor.js | MongoDB |
| MiniMongo |  |
| RxJS |  |
| HTML5/SCSS |  |

| Both | 
| ------- |
| Typescript |
| Mocha/Chai | 

### Testing

* *Work in progress*

#### unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Credits:

* Login Seed - [domfarolino](https://github.com/domfarolino/angular2-login-seed)

### To-Do:

* Sort out promise return values
* implement express-verification
* improve loading icons when inteface is pending changes
* improve masonry loading output
* improve error handling
* different connect.session() MemoryStore solution
* investigate this._log undefined in Sentry.io
* handle http:// (not s) visitors
* revert console.log to _log, disable in prod

### License

MIT License

[![Analytics](https://cjs-beacon.appspot.com/UA-10006093-3/github/cjsheets/angular-nightlife-app?pixel)](https://github.com/cjsheets/angular-nightlife-app)


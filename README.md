# Document Management System

[![Build Status](https://travis-ci.org/andela-jadewale/dms_api.svg?branch=develop)](https://travis-ci.org/andela-jadewale/dms_api)   [![Code Climate](https://codeclimate.com/github/andela-jadewale/dms_api/badges/gpa.svg)](https://codeclimate.com/github/andela-jadewale/dms_api)   [![Test Coverage](https://codeclimate.com/github/andela-jadewale/dms_api/badges/coverage.svg)](https://codeclimate.com/github/andela-jadewale/dms_api/coverage) 


Document Management System is an application that helps users manage their documents. A User can upload a document, edit and share with other users.The application permits users to work collaboratively on documents.

Development
-----------
This application is created using Nodejs environment. It implements [**Express**](http://expressjs.com/) as the routing framework and [**Mongoose**](http://mongoosejs.com/), an object modeling package, to interact with MongoDB.[**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Installation.
-------------
1. Install [**Nodejs**](www.nodejs.org) and [**MongoDB**](www.mongodb.org)
2. Clone this repo or download the zipped file.
3. Navigate to the master branch.
4. Run
    ```
    npm install

    ```
    This will install the required dependencies.
5. Run
    ```
    npm run seed

    ```
    This will seed the database
6. Run
  ```
  npm test

  ```
  to run the tests.
7. Run
  ```
  npm start

  ```
  Use [**Postman**](https://www.getpostman.com/) to consume the API.
8. Well...enjoy.

## Code Example



Testing.
--------
This application has been tested using [**supertest**](https://www.npmjs.com/package/supertest), which is a Super-agent driven library for testing Node.js HTTP servers using a fluent API and [**Mocha**](https://mochajs.org), which is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun.

Thank You.

#### Adewale Jolaade | Andela #TIA
 
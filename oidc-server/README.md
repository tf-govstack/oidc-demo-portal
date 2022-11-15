# OIDC demo server

This is a simple node js application which will act as backend for the OIDC portal.

## Overview

OIDC-Server has 1 endpoint.

- Post /fetchUserInfo:
  Request Body (application/json) = {
  "code": "{{code}}",
  "client_id": "{{clientId}}",
  "redirect_uri": "{{redirectionUrl}}",
  "grant_type": "authorization_code",
  "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "client_assertion": "{{client_assertion}}"
  }

  Response (application/json) = The response is signed and then encrypted, with the result being a Nested JWT.

## Build & run (for developers)

The application run on PORT=8888.

- Env variables

  - IDP_BASE_URL: MOSIP IDP API URL (Example:http://idp.idp/v1/idp)

- Build and run Docker for a service:

  ```
  $ docker build <dockerImageName>:<tag> .
  $ docker run -it -d -p 8888:8888 --env IDP_BASE_URL='<MOSIP IDP API URL>' <dockerImageName>:<tag>
  ```

- Build and run on local system: 
  Update "devstart" script in package.json file : "SET PORT=8888 && SET IDP_BASE_URL='<MOSIP IDP API URL>' && node app.js && nodemon ."
  ```
  $ npm run devstart
  ```

# OIDC demo UI
This react application is the UI for the OIDC demo Portal

## Build & run (for developers)

The application run on PORT=5000 by default.

- Env variables

  - IDP_UI_BASE_URL: MOSIP IDP UI URL (Example:https://idp.dev.mosip.net/)
  - IDP_API_URL: MOSIP IDP API URL (Example:https://api.dev.mosip.net/v1/idp)
  - OIDC_BASE_URL: This will be internally resolved to OIDC server by internal nginx  (Example:http://idp.dev.mosip.net/oidc-server)
  - REDIRECT_URI: Value that needs to be passed into authorize redirect_uri parameter (Example:https://health-services.com/userprofile)
  - CLIENT_ID: OIDC client Id, that is registered on IDP (Example:health-services)
  - ACRS: Value that needs to be passed into authorize acr_values parameter (Example:mosip:idp:acr:generated-code)


- Build and run Docker for a service:

  ```
  $ docker build -t <dockerImageName>:<tag> . 
  $ docker run -it -d -p 5000:5000 -e IDP_UI_BASE_URL='http://localhost:3000' -e IDP_API_URL=http://localhost:8088/v1/idp -e OIDC_BASE_URL=http://localhost:8888 -e  REDIRECT_URI=http://localhost:5000/userprofile -e CLIENT_ID=healthservices -e ACRS="mosip:idp:acr:static-code" <dockerImageName>:<tag>
  ```

- Build and run on local system: 
  Update "/oidc-ui/public/env-config.js" file according to the requirements   
  ```
  $ npm start
  ```

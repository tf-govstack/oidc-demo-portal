# OIDC demo portal

## Overview
This repository contains the source code OIDC portal UI and Server. OIDC portal is a reference implementation of a relying party's website that wants to use [MOSIP IDP services](https://github.com/mosip/idp) as the identity provider.

OIDC demo portal uses [OpenID specs](https://openid.net/specs/openid-connect-core-1_0.html) to communicate with MOSIP IDP services

OIDC portal contains 2 pages.
1. Home page: This page represents a login page of a relying party. This page include a button with text "Sign in with MOSIP". On the click this button, the user gets navigated to [MOSIP IDP Portal](https://idp.dev.mosip.net/login). User will be authenticated and will provide consent to share information from MOSIP to relying party, on IDP protal.
2. UserProfile Page: This page represents a user profile on the relying party website. On successfully authentication and consent approval, the user gets navigated here with an auth code. This auth code will be shared to the OIDC-Server(backend) via /fetchUserInfo endpoint. The backend then uses this auth code to fetch access token and user details from MOSIP IDP services.

const state = "eree2311";
const nonce = "ere973eieljznge2311";
const responseType = "code";
const scope = "openid profile";
const acr_values = "mosip:idp:acr:static-code";
const display = "page";
const prompt = "consent";
const grantType = "authorization_code";
const clientAssertionType =
  "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
const maxAge = "21";
const claimsLocales = "en";
const uiLocales = "en";

const clientDetails_healthservices_Anshul = {
  nonce: nonce,
  state: state,
  clientId: "healthservices_Anshul",
  scope: scope,
  response_type: responseType,
  redirect_uri: window.origin + process.env.REACT_APP_REDIRECT_URI,
  display: display,
  prompt: prompt,
  acr_values: acr_values,
  claims: {
    userinfo: {
      given_name: {
        essential: true,
      },
      phone_number: {
        essential: false,
      },
      email: {
        essential: true,
      },
      picture: {
        essential: false,
      },
      gender: {
        essential: false,
      },
      birthdate: {
        essential: false,
      },
    },
    id_token: {},
  },
  claims_locales: claimsLocales,
  max_age: maxAge,
  grant_type: grantType,
  client_assertion_type: clientAssertionType,
  ui_locales: uiLocales,
};

export { clientDetails_healthservices_Anshul as clientDetails };

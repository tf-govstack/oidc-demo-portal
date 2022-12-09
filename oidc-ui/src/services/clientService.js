import clientDetails from "../constants/clientDetails";

const getURIforSignIn = () => {
  return getURI(clientDetails.redirect_uri_userprofile);
};

const getURIforRegistration = () => {
  return getURI(clientDetails.redirect_uri_registration);
};

const getURI = (redirect_uri) => {
  let nonce = clientDetails.nonce;
  let state = clientDetails.state;
  let clientId = clientDetails.clientId;
  let response_type = clientDetails.response_type;
  let scope = clientDetails.scope;
  let acr_values = clientDetails.acr_values;
  let encodedClaims = encodeURI(JSON.stringify(clientDetails.claims));
  let display = clientDetails.display;
  let prompt = clientDetails.prompt;
  let maxAge = clientDetails.max_age;
  let claimsLocales = clientDetails.claims_locales;
  let uiLocales = clientDetails.ui_locales;
  let uibaseUrl = clientDetails.uibaseUrl;
  let authorizeEndpoint = clientDetails.authorizeEndpoint;

  let uri_idp_UI =
    uibaseUrl +
    authorizeEndpoint +
    "?nonce=" +
    nonce +
    "&state=" +
    state +
    "&client_id=" +
    clientId +
    "&redirect_uri=" +
    redirect_uri +
    "&response_type=" +
    response_type +
    "&scope=" +
    scope +
    "&acr_values=" +
    acr_values +
    "&claims=" +
    encodedClaims +
    "&display=" +
    display +
    "&prompt=" +
    prompt +
    "&max_age=" +
    maxAge +
    "&claims_locales=" +
    claimsLocales +
    "&ui_locales=" +
    uiLocales;

  return uri_idp_UI;
};

const clientService = {
  getURIforSignIn,
  getURIforRegistration,
};

export default clientService;

import { useState } from "react";
import { Error } from "../common/Errors";
import { clientDetails } from "../constants/clientDetails";

const uibaseUrl = window._env_.IDP_UI_BASE_URL;
const authorizeEndpoint = "/authorize";

export default function Login() {
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError({
      errorCode: "",
      errorMsg: "Authentication failed! Try sign in with MOSIP",
    });
  };

  let nonce = clientDetails.nonce;
  let state = clientDetails.state;
  let clientId = clientDetails.clientId;
  let redirect_uri = clientDetails.redirect_uri;
  let response_type = clientDetails.response_type;
  let scope = clientDetails.scope;
  let acr_values = clientDetails.acr_values;
  let encodedClaims = encodeURI(JSON.stringify(clientDetails.claims));
  let display = clientDetails.display;
  let prompt = clientDetails.prompt;
  let maxAge = clientDetails.max_age;
  let claimsLocales = clientDetails.claims_locales;
  let uiLocales = clientDetails.ui_locales;

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

  return (
    <section class="text-gray-600 h-screen bg-[#FAFAFC] body-font">
      <div class="container mx-auto flex px-40 py-14 md:flex-row flex-col items-center">
        <div class="flex justify-center rounded-none rounded-r-lg bg-[#FAFAFC] lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            class="object-cover object-center rounded"
            alt="util"
            src="images/illustartion.png"
          />
        </div>
        <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <div class="w-full flex justify-center">
            <img class="mb-8" src="images/doctor_logo.png" />
          </div>
          <h1 class="title-font sm:text-3xl text-3xl mb-8 font-medium text-gray-900">
            Sign in to Health Portal
          </h1>

          <div class="w-full flex mb-6">
            <span class="w-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
              <img src="images/username_icon.png" />
            </span>
            <input
              type="text"
              id="website-admin"
              class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  "
              placeholder="Username"
            />
          </div>
          <div class="w-full flex mb-6">
            <span class="w-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
              <img src="images/password_icon.png" />
            </span>
            <input
              type="text"
              id="website-admin"
              class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
              placeholder="Password"
            />
          </div>
          <button
            type="button"
            class="w-full justify-center text-white bg-[#2F8EA3] hover:bg-[#2F8EA3]/90 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
            onClick={handleLogin}
          >
            SUBMIT
          </button>

          {error && (
            <Error errorCode={error.errorCode} errorMsg={error.errorMsg} />
          )}

          <div class="flex w-full mb-6 mt-6 items-center px-10">
            <div class="flex-1 h-px bg-black" />
            <div>
              <p class="w-16 text-center">Or</p>
            </div>
            <div class="flex-1 h-px bg-black" />
          </div>
          <a
            href={uri_idp_UI}
            className="w-full font-medium text-blue-600 hover:text-blue-500"
          >
            <button
              type="button"
              class="relative w-full text-black bg-gray-50 shadow-lg hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
            >
              Sign in with MOSIP
              <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <img class="flex mr-1 ml-1 w-6 h-6" src="mosip_logo.png" />
              </div>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

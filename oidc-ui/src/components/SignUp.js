import { useState } from "react";
import { Error } from "../common/Errors";
import { clientDetails } from "../constants/clientDetails";

const uibaseUrl = window._env_.IDP_UI_BASE_URL;
const authorizeEndpoint = "/authorize";

export default function SignUp() {
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError({
      errorCode: "",
      errorMsg: "Sign Up failed! Try sign in with MOSIP",
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
    <>
      <div className="w-full px-20">
        <h1 className="w-full text-center title-font sm:text-3xl text-3xl mb-8 font-medium text-gray-900">
          Sign Up with health portal
        </h1>

        <div className="flex grid grid-cols-2 gap-2 w-full">
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>First Name</label>
            <input
              type="text"
              id="website-admin"
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>Last Name</label>
            <input
              type="text"
              id="website-admin"
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
        </div>
        <div className="w-full flex flex-col mb-6 text-slate-500">
          <label>Password</label>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
          />
        </div>
        <button
          type="button"
          className="w-full justify-center text-white bg-[#2F8EA3] hover:bg-[#2F8EA3]/90 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
          onClick={handleLogin}
        >
          SUBMIT
        </button>

        {error && (
          <Error errorCode={error.errorCode} errorMsg={error.errorMsg} />
        )}

        <div className="flex w-full mb-6 mt-6 items-center px-10">
          <div className="flex-1 h-px bg-black" />
          <div>
            <p className="w-16 text-center">Or</p>
          </div>
          <div className="flex-1 h-px bg-black" />
        </div>
        <a
          href={uri_idp_UI}
          className="w-full font-medium text-blue-600 hover:text-blue-500"
        >
          <button
            type="button"
            className="relative w-full text-black bg-gray-50 shadow-lg hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
          >
            Sign in with MOSIP
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <img className="flex mr-1 ml-1 w-6 h-6" src="mosip_logo.png" />
            </div>
          </button>
        </a>
        <div className="flex flex-justify mt-3 w-full items-center text-center">
          <p className="w-full text-center">
            If you already have an account please&nbsp;
            <a href="/" className="text-[#2F8EA3]">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

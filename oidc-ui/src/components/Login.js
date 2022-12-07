import { useState } from "react";
import { Error } from "../common/Errors";
import { clientDetails } from "../constants/clientDetails";
import { useTranslation } from "react-i18next";

const uibaseUrl = window._env_.IDP_UI_BASE_URL;
const authorizeEndpoint = "/authorize";

export default function Login({ i18nKeyPrefix = "login" }) {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: i18nKeyPrefix,
  });

  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError({
      errorCode: "sign_in_failed",
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
  let uiLocales = i18n.language;

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
          {t("sign_in_with_health_portal")}
        </h1>

        <div className="w-full flex mb-6 text-slate-500">
          <span className="w-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
            <img src="images/username_icon.png" />
          </span>
          <input
            type="text"
            id="user"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  "
            placeholder={t("username")}
          />
        </div>

        <div className="w-full flex mb-6 text-slate-500">
          <span className="w-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
            <img src="images/password_icon.png" />
          </span>
          <input
            type="password"
            id="password"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            placeholder={t("password")}
          />
        </div>
        <button
          type="button"
          className="w-full justify-center text-white bg-[#2F8EA3] hover:bg-[#2F8EA3]/90 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
          onClick={handleLogin}
        >
          {t("submit")}
        </button>

        {error && (
          <Error errorCode={error.errorCode} errorMsg={error.errorMsg} />
        )}

        <div className="flex w-full mb-6 mt-6 items-center px-10">
          <div className="flex-1 h-px bg-black" />
          <div>
            <p className="w-16 text-center">{t("or")}</p>
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
            {t("sign_in_with_mosip")}
            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
              <img className="flex mr-1 ml-1 w-6 h-6" src="mosip_logo.png" />
            </div>
          </button>
        </a>
        <div className="flex flex-justify mt-5 w-full items-center text-center">
          <p className="w-full text-center">
            {t("dont_have_existing_account")}&nbsp;
            <a href="/signup" className="text-[#2F8EA3]">
              {t("sign_up_here")}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

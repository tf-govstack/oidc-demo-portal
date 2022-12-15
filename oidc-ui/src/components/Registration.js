import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Error } from "../common/Errors";
import clientDetails from "../constants/clientDetails";
import { LoadingStates as states } from "../constants/states";
import LoadingIndicator from "../common/LoadingIndicator";
import { useTranslation } from "react-i18next";
import RedirectButton from "../common/RedirectButton";

export default function Registration({
  cryptoService,
  clientService,
  oidcService,
  i18nKeyPrefix = "registration",
}) {
  const { t } = useTranslation("translation", {
    keyPrefix: i18nKeyPrefix,
  });

  const { getURIforRegistration } = {
    ...clientService,
  };

  const { generateSignedJwt } = {
    ...cryptoService,
  };

  const { post_fetchUserInfo } = {
    ...oidcService,
  };

  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState(null);
  const [status, setStatus] = useState(states.LOADING);
  const uri_idp_UI = getURIforRegistration();

  const handleLogin = (e) => {
    e.preventDefault();
    setError({
      errorCode: "invalid_details",
    });
  };

  useEffect(() => {
    setError(null);
    setStatus(states.LOADING);

    const getSearchParams = async () => {
      let authCode = searchParams.get("code");
      let errorCode = searchParams.get("error");
      let error_desc = searchParams.get("error_description");

      if (errorCode) {
        setError({ errorCode: errorCode, errorMsg: error_desc });
        setStatus(states.ERROR);
        return;
      }

      if (authCode) {
        getUserDetails(authCode);
      } else {
        setStatus(states.LOADED);
      }
    };
    getSearchParams();
  }, []);

  //Handle Login API Integration here
  const getUserDetails = async (authCode) => {
    setError(null);
    setUserInfo(null);

    try {
      let client_id = clientDetails.clientId;
      let redirect_uri = clientDetails.redirect_uri_registration;
      let grant_type = clientDetails.grant_type;
      let client_assertion_type = clientDetails.client_assertion_type;
      let client_assertion = await generateSignedJwt(client_id);

      var userInfo = await post_fetchUserInfo(
        authCode,
        client_id,
        redirect_uri,
        grant_type,
        client_assertion_type,
        client_assertion
      );
      setUserInfo(userInfo);
      setStatus(states.LOADED);
    } catch (errormsg) {
      setError({ errorCode: "", errorMsg: errormsg.message });
      setStatus(states.ERROR);
    }
  };

  return (
    <>
      <div className="w-full px-50">
        <h1 className="w-full text-center title-font sm:text-3xl text-3xl mt-4 mb-4 font-medium text-gray-900">
          {t("child_registration")}
        </h1>

        <div className="flex grid grid-cols-2 gap-2 w-full">
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>{t("full_name")}</label>
            <input
              type="text"
              value={userInfo?.given_name}
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>{t("gender")}</label>
            <input
              type="text"
              value={userInfo?.gender}
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
        </div>
        <div className="flex grid grid-cols-2 gap-2 w-full">
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>{t("date_of_birth")}</label>
            <input
              type="text"
              value={userInfo?.birthdate}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
          <div className="w-full flex flex-col mb-6 text-slate-500">
            <label>{t("city")}</label>
            <input
              type="text"
              className="rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
            />
          </div>
        </div>
        <div className="w-full flex flex-col mb-6 text-slate-500">
          <label>{t("address")}</label>
          <input
            type="text"
            value={userInfo?.address}
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5"
          />
        </div>

        <div className="flex grid grid-cols-2 gap-2 w-full">
          <RedirectButton
            uri_idp_UI={uri_idp_UI}
            text={t("fetch_details")}
            logoPath="mosip_logo.png"
          />
          <button
            type="button"
            className="w-full justify-center text-white bg-[#2F8EA3] hover:bg-[#2F8EA3]/90 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center mr-2 mb-2"
            onClick={handleLogin}
          >
            {t("register")}
          </button>
        </div>

        {status === states.LOADING && (
          <LoadingIndicator size="medium" message={t("loading_msg")} />
        )}

        {error && (
          <Error errorCode={error.errorCode} errorMsg={error.errorMsg} />
        )}
      </div>
    </>
  );
}

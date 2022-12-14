import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Error } from "../common/Errors";
import clientDetails from "../constants/clientDetails";
import { LoadingStates as states } from "../constants/states";
import LoadingIndicator from "../common/LoadingIndicator";
import { useTranslation } from "react-i18next";

export default function UserProfile({
  cryptoService,
  oidcService,
  i18nKeyPrefix = "userprofile",
}) {
  const { t } = useTranslation("translation", {
    keyPrefix: i18nKeyPrefix,
  });

  const { generateSignedJwt } = {
    ...cryptoService,
  };

  const { post_fetchUserInfo } = {
    ...oidcService,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState({ errorCode: "", errorMsg: "" });
  const [userInfo, setUserInfo] = useState(null);
  const [status, setStatus] = useState(states.LOADING);

  useEffect(() => {
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
        setError({
          errorCode: "authCode_missing",
        });
        setStatus(states.ERROR);
        return;
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
      let redirect_uri = clientDetails.redirect_uri_userprofile;
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

  let el = (
    <div className="w-full pt-5">
      <div className="flex-grow bg-[#F2F4F4] mt-8 mb-6 shadow-lg rounded">
        <div className="py-10">
          {status === states.LOADING && (
            <LoadingIndicator size="medium" message={t("loading_msg")} />
          )}
          {status === states.LOADED && (
            <>
              <div className="px-4">
                <div className="font-bold flex justify-center">
                  {userInfo?.given_name}
                </div>
                <div className="font-bold flex justify-center">
                  {t("welcome_msg")}
                </div>
              </div>
              <div className=" px-3 py-6 flex justify-center">
                <img
                  alt={t("profile_picture")}
                  className="h-20 w-20"
                  src={
                    userInfo?.picture
                      ? userInfo.picture
                      : "User-Profile-Icon.png"
                  }
                />
              </div>

              <div className="divide-slate-300 gap-2">
                <div className="px-4 py-3 grid grid-cols-2">
                  <div className="flex justify-start">{t("email_address")}</div>
                  <div className="flex justify-end">
                    {userInfo?.email_verified ?? userInfo?.email}
                  </div>
                </div>
                <div className="px-4 py-3 bg-white grid grid-cols-2">
                  <div className="flex justify-start">{t("gender")}</div>
                  <div className="flex justify-end">{userInfo?.gender}</div>
                </div>
                <div className="px-4 py-3 grid grid-cols-2">
                  <div className="flex justify-start">{t("phone_number")}</div>
                  <div className="flex justify-end">
                    {userInfo?.phone_number_verified ??
                      userInfo?.phone ??
                      userInfo?.phone_number}
                  </div>
                </div>
                <div className="px-4 py-3 bg-white grid grid-cols-2">
                  <div className="flex justify-start">{t("birth_date")}</div>
                  <div className="flex justify-end">{userInfo?.birthdate}</div>
                </div>
              </div>
            </>
          )}
          {status === states.ERROR && (
            <Error errorCode={error.errorCode} errorMsg={error.errorMsg} />
          )}
        </div>
      </div>
    </div>
  );

  return el;
}

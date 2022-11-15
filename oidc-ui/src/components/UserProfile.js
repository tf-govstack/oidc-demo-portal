import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Error } from "../common/Errors";
import { clientDetails } from "../constants/clientDetails";
import { generateSignedJwt } from "../services/cryptoService";
import { LoadingStates as states } from "../constants/states";
import LoadingIndicator from "../common/LoadingIndicator";
import { post_fetchUserInfo } from "../services/oidcService";

export default function UserProfile() {
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
          errorMsg: "AuthCode Missing",
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
      let redirect_uri = clientDetails.redirect_uri;
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
    <>
      <section class="text-gray-600 h-screen bg-[#FAFAFC] body-font pb-14">
        <div class="container mx-auto flex px-24 pt-12 md:flex-row flex-col items-center">
          <div class="flex justify-center rounded-none rounded-r-lg bg-[#FAFAFC] max-w-lg w-full w-1/2 w-5/6 mb-10 pb-16">
            <img
              class="object-cover object-center rounded"
              alt="util"
              src="images/illustartion.png"
            />
          </div>
          <div className="relative flex-grow bg-[#F2F4F4] mb-6 shadow-lg rounded">
            <div className="py-10 flex-auto">
              {status === states.LOADING && (
                <LoadingIndicator
                  size="medium"
                  message={"Loading! Please wait."}
                />
              )}
              {status === states.LOADED && (
                <>
                  <div className="px-4">
                    <div className="font-bold flex justify-center">
                      {userInfo?.given_name}
                    </div>
                    <div className="flex justify-center">
                      Welcome to Health services
                    </div>
                  </div>
                  <div className=" px-3 py-3 flex justify-center">
                    <img
                      alt="profile picture"
                      className="h-20 w-20"
                      src={
                        userInfo?.picture
                          ? userInfo.picture
                          : "User-Profile-Icon.png"
                      }
                    />
                  </div>

                  <div class="divide-slate-300 gap-2">
                    <div class="px-4 py-1 grid grid-cols-2">
                      <div className="flex justify-start">Email Address</div>
                      <div className="flex justify-end">{userInfo?.email}</div>
                    </div>
                    <div class="px-4 py-1 bg-white grid grid-cols-2">
                      <div className="flex justify-start">Gender</div>
                      <div className="flex justify-end">{userInfo?.gender}</div>
                    </div>
                    <div class="px-4 py-1 grid grid-cols-2">
                      <div className="flex justify-start">Phone number</div>
                      <div className="flex justify-end">
                        {userInfo?.phone_number}
                      </div>
                    </div>
                    <div class="px-4 py-1 bg-white grid grid-cols-2">
                      <div className="flex justify-start">Birth Date</div>
                      <div className="flex justify-end">
                        {userInfo?.birthdate}
                      </div>
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
      </section>
    </>
  );

  return el;
}

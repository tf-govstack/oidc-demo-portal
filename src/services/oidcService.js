import axios from "axios";
import { decodeJWT } from "./cryptoService";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_OIDC_BASE_URL
    : window.origin + process.env.REACT_APP_OIDC_BASE_URL;

const fetchUserInfoEndPoint = "/fetchUserInfo";

const post_fetchUserInfo = async (
  code,
  client_id,
  redirect_uri,
  grant_type,
  client_assertion_type,
  client_assertion
) => {
  let request = {
    code: code,
    client_id: client_id,
    redirect_uri: redirect_uri,
    grant_type: grant_type,
    client_assertion_type: client_assertion_type,
    client_assertion: client_assertion,
  };

  const endpoint = baseUrl + fetchUserInfoEndPoint;
  const response = await axios.post(endpoint, request, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return decodeJWT(response.data);
};

export { post_fetchUserInfo };

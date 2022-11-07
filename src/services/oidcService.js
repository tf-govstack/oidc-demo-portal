import axios from "axios";
import { decodeJWT } from "./cryptoService";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_IDP_BASE_URL
    : window.origin + process.env.REACT_APP_IDP_BASE_URL;

const getTokenEndPoint = "/oauth/token";
const getUserInfoEndPoint = "/oidc/userinfo";

const post_GetToken = async (
  code,
  client_id,
  redirect_uri,
  grant_type,
  client_assertion_type,
  client_assertion
) => {
  let request = new URLSearchParams({
    code: code,
    client_id: client_id,
    redirect_uri: redirect_uri,
    grant_type: grant_type,
    client_assertion_type: client_assertion_type,
    client_assertion: client_assertion,
  });

  const endpoint = baseUrl + getTokenEndPoint;
  console.log(endpoint);
  const response = await axios.post(endpoint, request, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data;
};

const get_GetUserInfo = async (access_token) => {
  const endpoint = baseUrl + getUserInfoEndPoint;
  console.log(endpoint);
  const response = await axios.get(endpoint, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return decodeJWT(response.data);
};

export { post_GetToken, get_GetUserInfo };

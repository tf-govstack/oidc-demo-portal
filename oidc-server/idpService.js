const axios = require("axios");
const { IDP_BASE_URL } = require("./config");

const baseUrl = IDP_BASE_URL;
const getTokenEndPoint = "/oauth/token";
const getUserInfoEndPoint = "/oidc/userinfo";

const post_GetToken = async ({
  code,
  client_id,
  redirect_uri,
  grant_type,
  client_assertion_type,
  client_assertion,
}) => {
  let request = new URLSearchParams({
    code: code,
    client_id: client_id,
    redirect_uri: redirect_uri,
    grant_type: grant_type,
    client_assertion_type: client_assertion_type,
    client_assertion: client_assertion,
  });
  const endpoint = baseUrl + getTokenEndPoint;
  const response = await axios.post(endpoint, request, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(response.data)
  return response.data;
};

const get_GetUserInfo = async (access_token) => {
  const endpoint = baseUrl + getUserInfoEndPoint;
  const response = await axios.get(endpoint, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return response.data;
};

module.exports = {
  post_GetToken: post_GetToken,
  get_GetUserInfo: get_GetUserInfo,
};

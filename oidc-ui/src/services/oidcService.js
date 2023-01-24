import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_OIDC_BASE_URL
    : window._env_.OIDC_BASE_URL;

const fetchUserInfoEndPoint = "/fetchUserInfo";

const post_fetchUserInfo = async (
  code,
  client_id,
  redirect_uri,
  grant_type
) => {
  let request = {
    code: code,
    client_id: client_id,
    redirect_uri: redirect_uri,
    grant_type: grant_type
  };

  const endpoint = baseUrl + fetchUserInfoEndPoint;
  const response = await axios.post(endpoint, request, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const oidcService = { post_fetchUserInfo };

export default oidcService;

import * as jose from "jose";

const idpApiURL = window._env_.IDP_API_URL;

const privatePem = window._env_.PRIVATE_KEY;

const alg = "RS256";
const expirationTime = "1h";

const generateSignedJwt = async (clientId) => {
  // Set headers for JWT
  var header = {
    alg: alg,
    typ: "JWT",
  };

  var payload = {
    iss: clientId,
    sub: clientId,
    aud: idpApiURL,
  };

  // const keyObjFromJwk = await jose.importJWK(public_private_key_jwk, alg);
  var privateKey = await jose.importPKCS8(privatePem, alg);

  const jwt = new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(privateKey);

  return jwt;
};

const decodeJWT = async (signed_jwt) => {
  const data = await new jose.decodeJwt(signed_jwt);

  return data;
};

const cryptoService = {
  generateSignedJwt,
  decodeJWT,
};

export default cryptoService;

import * as jose from "jose";

const idpApiURL = window._env_.IDP_API_URL;

const privatePem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoebt3VgqwAE5k
zoSSE/L3KnKGZifV904wimdk0xIEnTi3+jiTDqPBjPiw9xmZg+sy2RKp+gxeX7Sh
tZ8LDNcBtrotDfFs2lQqQHqRbBkfC87l0H5Fumv2YPP0lXukoIUcRiiB6BqKLvKP
KzJ9A1vlCnsKTpDSopTTfYKJkHokrt8NAim9MXC40U6rqgtPHsy+h/AJAlk4cpbK
2UQnSqHMc3bI9WuUd4YQhb12ZdONL3E7z8EXyYQ5YmqXKky8emkzP/nXPnBoGH/W
L4LvR47oSxDg1XksdWPsvVXG+m6grqXNeasDs0witA7hkfYgspju0KNL1QFCeHEa
1YAINX83AgMBAAECggEAPbT4mOkG2RgDnqCVpftwjl8Zu2hHRvNhzB2laSR2AQKk
953KgvJlwEql/AtFcRkEWIdxcpiHVzmuq1weeKmnRpVq832b48bD9QXQ3tq9CMYG
bd5Dob56NK+mKvtlYhL5LjX0OECPF/XCGfY0c917FxUTo97K5Jtv71aVLVWhpzVc
7YxwZ0mOuBVRVb/7YR8wVNWXN6FfAJdJlGP+KPzC5Sc+uhIUrNOmvVwTGUJNPcuo
lY/CSPuZm0UxuhgEGGxE4e4xvPVvHN0z+1kzN6+ocyQT0vEaZ+H/A+WK3NBxFJeh
pUfgszVqbg/d1MNO9+8HijjmW0lep41UZhvXmaqWoQKBgQDjvF0SLRZtLLeUTsqQ
8aqwrclNznevnXCZLi376haGCPY8NHNQI//xfXT7zGN8TLGfUh4VKA9Mi2BDDyE/
M62f4m3RkwJlgeEdKk7Y7XE+WZKR2z1zDKa17DpBI2MYv7elNJAh/3iLKQKvT0+7
X7TypNdi3Vb/lWC+Y/POIZsoBQKBgQC9YowdicVf7iynWLiPeEJPeE0zjogz7fTJ
JOgsPnPB/M0A4+6EvBlZm7IBNm3xuJx3gRbRrqbHoAdkEqkLpxWXovNOq08RZtTg
IJTflAA0dSl4P9tedjBL6FFwKUsq/rDjiVNEYxTwobRRZtGyS0WURfV90RTUfWY8
IHYhx91bCwKBgE8bRkUjDlA8IUTOHcU9fSpEI9H4L1D8YnmDNgv0o4BJqqb9HTUw
XB6ZksJInCI4Tdbm4nY85RuUqoqAve7DV8NbFwSeiU2TUQwdfygRSq361VP/ERhe
w6Yb+ZxY23pkVjl3yb1VjZzhUQJujWar9yH2Kq837Zl4XROlirIGsGu1AoGATWGo
0qDqbsoIoNAViTmgDoyfLsO8T0uZS16zJvDVp5u9v/FiEgYxbXW6g9hTkALYm9O5
GS/9oW931aHyRHqezfic5bYFdpzHulRVwAzfEJAWw7WD0tMD5OAl9mhI+GZcrHv9
8+FwOuo3nVMft3QeF/mF10TI+BHM5iB1ZFQf1AUCgYBV7DjjbaqFMmjSgXGLZB79
QrLw/SxQ/KNE3tLTHybQdpfa1Aoz4oWEqybu/DZKvH80z5F0sYLKeRqjzGDPYn+7
xL7uo53NwNrBFTXPesoglqTf4VYRtSzrSMBpKw1A1ZBS4Do/gQ3suwWlH2JL3kd+
z7b38RC18TpJXO/AKHBQLg==
-----END PRIVATE KEY-----`;

const public_private_key_jwk = {
  p: "7iQxO-m5ikmNS0iqQ72CIQMIl0YIWVd85pCxfDsUM9EEUtqQoT8u1N8KpdpudFpWYDfRN1Qe2Kg0VflQ71ypATYGRumOpyZpOaABcVR1G2qoc8zDRXQtvjY9dJayVtu8DgPe6_B_wz-Dirmx8GbviqN-LGxLtZBWrK87_7alIIM",
  kty: "RSA",
  q: "rpv_kQqB0ZhFUaQ3zwbojddJsucQpVksjMbEFwqI90sSzjqgrkGp2ki0sDwoNgOxiD7X3BWg1Qi0hL6QYyZSfA9cmt8FOLAT_1dgqaj7B9sYN3ApB34G-0gWvYxIZMFkkSvvlYWx1smb9lb5kQIYwpH1fNxITF_HwiaqhJZHGwE",
  d: "dsk1-WYKMEjXLmuoPuc9qF1AHU3Zw4miwrfv5Hp0u-G7m5TDuGVdRMyb42rNh9oqkk-aJenR5bevfVJKAcfLsqgWh7988SivwUvFNkX6QO2THB75Wpma2l7KWn8whUL8dPZ81ry8zmimnTkdogReiBmDsmHjGUoXNm5vcU6t7U7hj3p8-IrHSnwDdnUwedssyOpTRjIjk26CK8D48AX_zcndMPPzHZMogdae1LAGbH89tCe5-UW0X7JI0ErCJuMakDeTaaQFylnR8qvPRrK0BWKxUcZuYHbcfv779MMSfWN0mxOCQPs2nM9auqZzbpU6Us5Ks2G3pUNAovChWQDQAQ",
  e: "AQAB",
  use: "sig",
  kid: "bBu_f2D52K-8D3WvvvYea2IqJvrtqVlz02A8tMzb8cg",
  qi: "2_YTyS2ZX64PZ_hcavKbmXJDE2eeyPpFO8wwlPBH-KOcL66yC_WFOiZTCgnBGlOpcNCU2adDfIlFZeWe0s5opv-UJBa9VZ6_UiGnL4JIabfYZbls6UWaj2MvxWpvbvJUBUs2Q6-AyUuA6XYKP5Iu2_ygfWEQhJ617uOiG9ckGvo",
  dp: "PHb0CUJO2c3TEkpg8NItODSM-dvOQuDz1ZbneaOGfaGUd3UHQ-nG-kWnbnUHloNZaxTBCktRibErmKi05BGi16vf7CFhFw-pp_f4Zc4L7eom20AiVIArHSCoefHJVkR0exqAf2eRCQIXZCHCDEgWihz47E6S6oa7ex0DHupBAw",
  alg: "RS256",
  dq: "FjZQF5Jfm1skjlM2qkZ1tP2LKZANZQtoCGyMq2WysMrDFKsOn7xIsDUJj1XHw79KiUt9SEkUEaWu2Sgo1AQfABswK59tWZ3EnXnvGQYfEQvFE-BXx9U3bCXqhqhe2Tpk4bbWHo5IZkt1ZKwByXmbzryknwKiy9xvW_pxPLalSwE",
  n: "om23HYFzXTZD5S4kYKd8ePx_poLLPCPtb3TMEB8-HyR9RbIkDLJjci_G042Sc9drMVKqRNFWRVxIlWVwckWNXdBybp6OYeItxnXi3lheum7zXFow72S-21iFSLxqgkMYsrc9N-Z3R0LmhWdsd6gmAvLb9L-4L8ILBv7KzH_YqpIJRzLgHRTFqzr-R3nN9zNL8_SEoncY9N8QmlmGtuM0BJjrIP4OLRW8eKHQGiv7wDa1wp883gR2YjE-NZIG7gIez6G3L_uqEuiK3MrvNFCd8_WFGnAgM3va5cGEU_GVoOtj02xhsalUxOn1xgaN9RCNsI_6exwJJ22PIV6n52fxgw",
};

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

  const keyObjFromJwk = await jose.importJWK(public_private_key_jwk, alg);
  // var privateKey = await jose.importPKCS8(privatePem, alg);

  const jwt = new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(keyObjFromJwk);

  return jwt;
};

const decodeJWT = async (signed_jwt) => {
  const data = await new jose.decodeJwt(signed_jwt);

  return data;
};

export { generateSignedJwt, decodeJWT };

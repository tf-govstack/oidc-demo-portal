FROM node:12.18.4-alpine as build

ARG idp_ui_base_url
ARG idp_api_base_url
ARG oidc_base_url
ARG redirect_uri
ARG client_id
ARG acrs

ENV IDP_UI_BASE_URL=$idp_ui_base_url
ENV IDP_API_URL=$idp_api_base_url
ENV OIDC_BASE_URL=$oidc_base_url
ENV REDIRECT_URI=$redirect_uri
ENV CLIENT_ID=$client_id
ENV ACRS=$acrs


## oidc demo portal
WORKDIR ./app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

EXPOSE 443

FROM nginx:1.15.2-alpine

COPY nginx-hs-selfsigned.crt /etc/ssl/certs/nginx-hs-selfsigned.crt
COPY nginx-hs-selfsigned.key /etc/ssl/private/nginx-hs-selfsigned.key
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html


WORKDIR /usr/share/nginx/html
COPY ./env.sh .
ADD .env .

# Make our shell script executable
RUN chmod +x env.sh

RUN echo "IDP_UI_BASE_URL=$IDP_UI_BASE_URL" > .env && echo "IDP_API_URL=$IDP_API_URL" >> .env && echo "OIDC_BASE_URL=$OIDC_BASE_URL" >> .env && echo "REDIRECT_URI=$REDIRECT_URI" >> .env && echo "CLIENT_ID=$CLIENT_ID" >> .env && echo "ACRS=$ACRS" >> .env

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

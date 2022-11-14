
FROM node:12.18.4-alpine as build

ARG idp_ui_base_url
ARG idp_api_url

#Set working directory to /app
WORKDIR /app

#Copy package.json in the image
COPY package*.json ./

#Run npm install command
RUN npm install

#Copy the app
COPY . ./

ENV REACT_APP_IDP_UI_BASE_URL=${idp_ui_base_url}
ENV REACT_APP_IDP_API_URL=${idp_api_url}

#Start the app
# CMD [ "npm", "run", "start" ]
RUN npm run build

EXPOSE 443

FROM nginx

COPY nginx-hs-selfsigned.crt /etc/ssl/certs/nginx-hs-selfsigned.crt
COPY nginx-hs-selfsigned.key /etc/ssl/private/nginx-hs-selfsigned.key

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
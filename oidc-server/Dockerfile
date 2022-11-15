
FROM node:12.18.4-alpine as build

ARG idp_api_url

WORKDIR /app

#Copy the app
COPY . ./
ENV PORT=8888
ENV IDP_BASE_URL=${idp_api_url}

RUN npm install
CMD ["node", "./app.js"]
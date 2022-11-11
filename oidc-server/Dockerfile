
FROM node:12.18.4-alpine as build

WORKDIR /app

#Copy the app
COPY . ./
ENV PORT=8888
ENV IDP_BASE_URL=http://192.168.0.105:8088/v1/idp

RUN npm install
CMD ["node", "./app.js"]
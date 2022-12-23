FROM node:12.18.4-alpine as build

ARG idp_ui_base_url
ARG oidc_base_url
ARG redirect_uri
ARG client_id
ARG acrs

ENV IDP_UI_BASE_URL=$idp_ui_base_url
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

FROM nginx

ARG SOURCE
ARG COMMIT_HASH
ARG COMMIT_ID
ARG BUILD_TIME
LABEL source=${SOURCE}
LABEL commit_hash=${COMMIT_HASH}
LABEL commit_id=${COMMIT_ID}
LABEL build_time=${BUILD_TIME}

# can be passed during Docker build as build time environment for github branch to pickup configuration from.
ARG container_user=mosip

# can be passed during Docker build as build time environment for github branch to pickup configuration from.
ARG container_user_group=mosip

# can be passed during Docker build as build time environment for github branch to pickup configuration from.
ARG container_user_uid=1001

# can be passed during Docker build as build time environment for github branch to pickup configuration from.
ARG container_user_gid=1001

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

# install packages and create user
RUN apt-get -y update \
    && groupadd -g ${container_user_gid} ${container_user_group} \
    && useradd -u ${container_user_uid} -g ${container_user_group} -s /bin/sh -m ${container_user} \
    && mkdir -p /var/run/nginx /var/tmp/nginx \
    && chown -R ${container_user}:${container_user} /usr/share/nginx /var/run/nginx /var/tmp/nginx

ENV work_dir=/usr/share/nginx/html

WORKDIR ${work_dir}
COPY ./env.sh .
ADD .env .

# Make our shell script executable
RUN chmod +x env.sh

RUN echo "IDP_UI_BASE_URL=$IDP_UI_BASE_URL" > .env && echo "IDP_API_URL=$IDP_API_URL" >> .env && echo "OIDC_BASE_URL=$OIDC_BASE_URL" >> .env && echo "REDIRECT_URI=$REDIRECT_URI" >> .env && echo "CLIENT_ID=$CLIENT_ID" >> .env && echo "ACRS=$ACRS" >> .env && echo "PRIVATE_KEY=$PRIVATE_KEY" >> .env

# change permissions of file inside working dir
RUN chown -R ${container_user}:${container_user} ${work_dir}

# select container user for all tasks
USER ${container_user_uid}:${container_user_gid}

EXPOSE 5000

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

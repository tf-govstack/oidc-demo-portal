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

# can be passed during Docker build as build time environment for artifactory URL
ARG artifactory_url

# environment variable to pass artifactory url, at docker runtime
ENV artifactory_url_env=${artifactory_url}

ENV work_dir=/usr/share/nginx/html

ENV i18n_path=${work_dir}/locales

# set working directory for the user
WORKDIR /home/${container_user}

# install packages and create user
RUN apt-get -y update \
    && apt-get install -y wget unzip zip \
    && groupadd -g ${container_user_gid} ${container_user_group} \
    && useradd -u ${container_user_uid} -g ${container_user_group} -s /bin/sh -m ${container_user} \
    && mkdir -p /var/run/nginx /var/tmp/nginx ${work_dir}/locales\
    && chown -R ${container_user}:${container_user} /usr/share/nginx /var/run/nginx /var/tmp/nginx ${work_dir}/locales

ADD configure_start.sh configure_start.sh

RUN chmod +x configure_start.sh

RUN chown ${container_user}:${container_user} configure_start.sh

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build ${work_dir}

ADD .env ${work_dir}/.env

COPY ./env.sh ${work_dir}/env.sh

# Make our shell script executable
RUN chmod +x ${work_dir}/env.sh

RUN echo "IDP_UI_BASE_URL=$IDP_UI_BASE_URL" > ${work_dir}/.env && echo "OIDC_BASE_URL=$OIDC_BASE_URL" >> ${work_dir}/.env && echo "REDIRECT_URI=$REDIRECT_URI" >> ${work_dir}/.env && echo "CLIENT_ID=$CLIENT_ID" >> ${work_dir}/.env && echo "ACRS=$ACRS" >> ${work_dir}/.env

# change permissions of file inside working dir
RUN chown -R ${container_user}:${container_user} ${work_dir}

# select container user for all tasks
USER ${container_user_uid}:${container_user_gid}

EXPOSE 5000

ENTRYPOINT [ "/home/mosip/configure_start.sh" ]

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

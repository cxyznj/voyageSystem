# base image
FROM python:3.8.5-alpine

# set working directory
WORKDIR /usr/src/app

# add and install requirements
COPY ./requirements.txt .
RUN apk add --no-cache mariadb-connector-c-dev
RUN apk update && apk add python3 python3-dev mariadb-dev build-base tk && pip3 install -r requirements.txt && apk del python3-dev mariadb-dev build-base

# add entrypoint.sh
COPY ./entrypoint.sh .
RUN chmod +x /usr/src/app/entrypoint.sh

# add app
COPY ./djangoApp .

# run server
CMD ["/usr/src/app/entrypoint.sh"]
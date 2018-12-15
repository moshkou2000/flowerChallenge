FROM  node:latest

RUN mkdir -p /usr/src/app


WORKDIR /usr/src/app

COPY . .


CMD node index.js
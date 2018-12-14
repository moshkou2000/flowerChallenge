FROM node:boron

RUN mkdir -p /usr/src/app


WORKDIR /usr/src/app

COPY . .

ENV File true

CMD {"node", "index.js"}



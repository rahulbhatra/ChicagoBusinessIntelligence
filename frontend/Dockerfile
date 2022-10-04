FROM node:lts AS development

ENV CI=true
ENV PORT=3000

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
COPY tsconfig.json /code/tsconfig.json

COPY . /code
RUN npm ci


CMD [ "npm", "start" ]

FROM development AS builder

RUN npm run build

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF
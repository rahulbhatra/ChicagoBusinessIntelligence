FROM node:16.13.0

ENV CI=true
ENV PORT=3000

WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

CMD [ "npm", "start" ]
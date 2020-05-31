FROM node:lts-alpine
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
USER node
RUN npm install
COPY . .

EXPOSE 3000
RUN npm run start:prod

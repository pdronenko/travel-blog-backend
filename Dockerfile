FROM node:lts-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm test

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./
CMD [ "NODE_ENV=production", "node", "./main" ]

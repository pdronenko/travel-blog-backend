FROM node:lts-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
RUN npm run build
RUN npm test
CMD [ "npm", "run", "start:prod" ]

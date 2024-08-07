FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4002

CMD npm start

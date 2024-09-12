FROM node:20.17
WORKDIR /app

COPY ./src ./

RUN npm install

CMD npm run resetdb && npm run main

EXPOSE 3001
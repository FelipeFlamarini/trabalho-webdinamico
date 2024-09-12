FROM alpine:3.19.1  

WORKDIR /app

COPY ./src ./

RUN apk add nodejs-lts npm && npm install

CMD npm run resetdb && npm run main

EXPOSE 3001
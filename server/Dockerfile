FROM alpine:3.19.1

WORKDIR /app

COPY ./server ./

COPY ./package.json ./

RUN apk add nodejs-lts npm && \
    npm install && \
    npm run resetdb

CMD npm run main

EXPOSE 3001
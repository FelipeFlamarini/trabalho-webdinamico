FROM alpine:3.19.1  

WORKDIR /app

COPY ./src ./

RUN apk add nodejs-lts npm && \
    npm install && \
    npm run resetdb

CMD npm run main

EXPOSE 3001
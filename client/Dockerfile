FROM alpine

WORKDIR /app

COPY ./ ./

RUN apk add nodejs-lts npm && \
    npm run main
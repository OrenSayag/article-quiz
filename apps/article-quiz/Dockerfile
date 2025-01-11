FROM node:18-alpine3.18 as installer

ARG NX_TASK_TARGET_PROJECT

WORKDIR /app

COPY ./dist/apps/$NX_TASK_TARGET_PROJECT/package.json .

RUN yarn --production

COPY ./dist/apps/$NX_TASK_TARGET_PROJECT .

FROM node:alpine

LABEL org.opencontainers.image.source=https://github.com/OrenSayag/article-quiz

EXPOSE 3000

WORKDIR /app

COPY --from=installer /app .

CMD ["node", "."]

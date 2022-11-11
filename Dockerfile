FROM node:16.17.1 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN rm -rf node_modules \
    && yarn install --frozen-lockfile \
    && yarn run build 

# ---

FROM node:16.17.1

ENV NODE_ENV PROD

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/main.js"]
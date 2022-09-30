FROM node:16.17.1

WORKDIR /app
COPY . .

RUN yarn cache clean --force && \
    yarn install --ignore-scripts && \
    yarn build

CMD ["yarn", "start:prod"]
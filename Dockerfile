FROM node:14

WORKDIR /app

COPY ./package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 9000

CMD ["yarn", "start"]

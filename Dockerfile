FROM node:18.12.1-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start:prod:pm2"]

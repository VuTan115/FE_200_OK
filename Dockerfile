FROM node:16.13.2-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN yarn build

RUN ls -a

CMD ["yarn", "start"]
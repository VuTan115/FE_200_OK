FROM node:16.13.2-alpine

WORKDIR /app

COPY ckeditor5-build-classic ./ckeditor5-build-classic

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

ENV NODE_ENV=production
ENV PORT="3000"

RUN yarn build

RUN ls -a

CMD ["yarn", "start"]
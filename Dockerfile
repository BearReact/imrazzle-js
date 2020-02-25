FROM node:13.5

RUN apt-get update -y
WORKDIR /opt/app/
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]

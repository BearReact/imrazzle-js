FROM node:13.5 AS builder
RUN apt-get update -y
WORKDIR /opt/app/
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM node:13.5
WORKDIR /opt/app/
COPY --from=builder /opt/app/ .
EXPOSE 3000
CMD ["yarn", "start"]

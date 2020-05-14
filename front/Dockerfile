FROM node:12 AS front-build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.18
COPY --from=front-build /usr/src/app/dist /usr/share/nginx/html
WORKDIR /etc/nginx/conf.d/
COPY nginx.conf default.conf

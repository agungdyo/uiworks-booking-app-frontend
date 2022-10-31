FROM node:14 AS builder
WORKDIR /app
COPY package* ./
RUN npm install -g ionic
RUN npm install
COPY . .
RUN cp /app/src/environments/environment.prod.ts /app/src/environment/environment.ts
RUN npm run build

FROM nginx:alpine
LABEL maintainer="pabbas@makaramas.co.id"
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/www/ /usr/share/nginx/html/
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80
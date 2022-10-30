FROM node:14 AS builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
LABEL maintainer="pabbas@makaramas.co.id"
COPY --from=builder /app/dist/tennis-feb /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
EXPOSE 80
FROM node:14-alpine AS builder

WORKDIR /app
COPY . ./
EXPOSE 3000
RUN npm install
RUN npm start
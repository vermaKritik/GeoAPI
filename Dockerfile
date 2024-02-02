# Use an official Node.js runtime as the base image
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "./src/server.js" ] 
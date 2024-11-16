FROM node:lts

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["node", "swagger.js"]

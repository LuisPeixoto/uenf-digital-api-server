FROM node:14

WORKDIR src/server

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=8080
ENV MONGO_DB="mongodb+srv://uenfdigital:uenfdigital4583576@uenf-digital-cluster.ekdn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

CMD ["node", "src/server.js"]

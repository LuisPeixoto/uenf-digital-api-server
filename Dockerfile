FROM node:14

WORKDIR src/server

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=8080
ENV MONGO_DB="mongodb+srv://uenfdigital:uenfdigital4583576@uenf-digital-cluster.ekdn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
ENV NOTIFICATION_KEY = "AAAAQ5HeKhQ:APA91bGHcXwvw1t0ylMDOIAS-7zg3ArI2-IbaTFTl9blBKJ7mnFe0xjj6r5GIWKmvEes8yriu5wPn2Cpo-7HFAVx5RhLgzpez6sHquyjB3zvmDpS6rj_grlu0dXFydg8e3reUpbqR8Ku"

CMD ["node", "src/server.js"]

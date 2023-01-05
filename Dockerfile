FROM node:18

WORKDIR /.

COPY package*.json ./

RUN npm install 
#RUN npm ci --only=production

COPY  . .

# EXPOSE 3000

CMD [ "node", "server.js" ]
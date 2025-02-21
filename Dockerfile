FROM node:21

WORKDIR /app 

COPY . . 

RUN npm install

EXPOSE 4200

CMD [ "npm", "run", "start:dev" ]
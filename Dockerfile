#Define the OS - Linux Argon
FROM node:argon

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install App Dependencies
COPY package.json /usr/src/app/
RUN npm install

#Bundle app source
COPY ./src/app

EXPOSE 5000
CMD ["npm", "start"]

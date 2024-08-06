FROM circleci/node:17.2.0-browsers
WORKDIR /home/circleci/project
#COPY ./package.json .
#COPY ./package-lock.json .
#COPY ./MERN ./MERN
#COPY ./public ./public
#COPY ./src ./src
#COPY ./test ./test
#COPY ./.env .
RUN sudo npm install



#CMD ["mongod", "--version"]
#CMD ["node", "MERN/backend_server/server.js"]
#CMD ["npm", "test"]
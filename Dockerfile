FROM circleci/node:17.2.0-browsers
WORKDIR /home/circleci/project
COPY ./package.json .
COPY ./package-lock.json .
RUN sudo npm install
EXPOSE 5000
EXPOSE 3000

CMD ["node", "MERN/backend_server/server.js"]
CMD ["npm", "start"]
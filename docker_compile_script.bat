@echo off

REM stop any previous instances
echo "Stopping previous the-feed containers..."
docker stop the-feed

REM Remove old container to avoid conflicts
docker rm the-feed

REM Pull the docker image
echo "Downloading docker image..."
docker pull mechlizard/the-feed-web:latest

REM Create a container from the image
echo "Creating container..."
docker create -p 3000:3000 -p 8000:8000 -p 27017:27017 -e MONGO_URL=mongodb://the-feed-mongodb-1:27017/MERN --name the-feed mechlizard/the-feed-web:latest

REM Copy files from the current directory to the container
echo "Copying project files..."
docker cp ./MERN the-feed:/home/circleci/project/MERN
docker cp ./public the-feed:/home/circleci/project/public
docker cp ./src the-feed:/home/circleci/project/src
docker cp ./test the-feed:/home/circleci/project/test
docker cp ./package.json the-feed:/home/circleci/project
docker cp ./package-lock.json the-feed:/home/circleci/project
docker cp ./.env the-feed:/home/circleci/project

REM start the container
echo "Starting the container..."
docker start the-feed

REM Run the container
docker logs -f the-feed

@echo on
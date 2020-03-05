# Use the official image as a parent image
FROM node:latest

# Set the working directory
WORKDIR /usr/app

# Copy the file from your host to your current location
COPY ["package.json", "./"]

# Run the command inside your image filesystem
RUN npm install

# Run the specified command within the container.
CMD [ "npm", "start" ]

RUN npm install -g nodemon
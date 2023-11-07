# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all the source code to the working directory
COPY . .

# Expose the port that your Node.js app will run on
EXPOSE 3007

# Define the command to run your Node.js application
CMD ["npm", "start"]

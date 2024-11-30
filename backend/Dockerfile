# backend/Dockerfile

# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Start the backend server
CMD ["node", "index.js"]

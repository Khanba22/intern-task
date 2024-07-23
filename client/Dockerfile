# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set environment variables (adjust as necessary)
ENV PORT=3000

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]

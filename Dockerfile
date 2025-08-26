# Use Node LTS
FROM node:20

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full source code
COPY . .

# Ensure Node uses ES modules
ENV NODE_ENV=production
ENV NODE_OPTIONS=--experimental-specifier-resolution=node

# Expose the port your app listens on
EXPOSE 3000

# Start the backend
CMD ["node", "index.js"]

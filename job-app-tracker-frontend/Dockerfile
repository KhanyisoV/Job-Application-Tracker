# Stage 1: build the React app
FROM node:18 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and build
COPY . .
RUN npm run build

# Stage 2: serve the React app with nginx
FROM nginx:alpine
# Copy the build output to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Azure
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Use a Node image to build the project
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Inject environment variables (REACT_APP_ prefix is required for React)
ARG REACT_APP_AWS_DNS
ARG REACT_APP_GRAPHQL_SERVER_PORT

# Build the app
RUN npm run build

# Serve the app with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

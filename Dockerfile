# Use a Node.js base image
FROM node:alpine as builder

# Set the working directory
WORKDIR '/app'

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the built TypeScript code
COPY ./ ./

CMD ["npm", "start"]

# Build the TypeScript code
# RUN npm run build

# Use an Nginx base image
# FROM nginx
# EXPOSE 80

# Copy the built files to Nginx's web root
# COPY --from=builder /app/dist /usr/share/nginx/html

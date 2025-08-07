# Start with an alpline linux base
FROM alpine

# Label myself as maintainer
MAINTAINER roenoe

# Set working directory in the container
WORKDIR /app

# Install dependencies
RUN apk update
RUN apk add nodejs npm sqlite

# Install necessary npm dependencies
COPY package*.json ./
RUN npm i

# Copy the rest of my application
COPY . .

# Initialize the database
RUN sh initdb.sh

# Expose the port the application will run on
EXPOSE 21570

# Start application
CMD [ "node", "app.js" ]

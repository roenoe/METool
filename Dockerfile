# Start from alpine (small base)
FROM alpine

MAINTAINER roenoe

# Install dependencies
RUN apk update
RUN apk add git nodejs npm sqlite

# Clone application code
WORKDIR /root
RUN git clone https://github.com/roenoe/METool
WORKDIR /root/METool

# Install npm dependencies and create the database
RUN npm i
RUN touch db/database.db
RUN sqlite3 db/database.db < db/initdb.sql

# Expose the port for the application
EXPOSE 21570

# Start application
CMD [ "node", "app.js" ]

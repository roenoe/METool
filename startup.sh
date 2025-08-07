#!/bin/sh

# Ensure Node.js dependencies are installed
# This is useful for new checkouts or when package.json changes
echo "Installing Node.js dependencies..."
npm install

# Check if sqlite3 is installed and install it if not
if [ ! -d "node_modules/sqlite3" ]; then
    echo "Installing sqlite3..."
    npm install sqlite3
fi

# Path to the database file and initialization script
DB_FILE="/app/db/database.db"
INIT_SQL="/app/db/initdb.sql"

# Check and initialize the database if it doesn't exist.
if [ ! -f "$DB_FILE" ]; then
  echo "Database file '$DB_FILE' not found. Initializing database..."
  mkdir -p "$(dirname "$DB_FILE")" # Ensure the directory exists
  touch "$DB_FILE"
  sqlite3 "$DB_FILE" < "$INIT_SQL"
  echo "Database initialized."
else
  echo "Database file '$DB_FILE' already exists. Skipping initialization."
fi

# Start the Node.js application
echo "Starting Node.js application..."
exec node app.js

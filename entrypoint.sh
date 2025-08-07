#!/bin/sh

# Path to the database file and initialization script
DB_DIR="/app/db"
DB_FILE="$DB_DIR/database.db"
INIT_SQL="$DB_DIR/initdb.sql"

echo "Checking for existing database..."
# Check if database exists jin the moutned volume
if [ ! -f "$DB_FILE" ]; then
  echo "Database file $DB_FILE not found. Initializing database..."
  mkdir -p $DB_DIR
  touch $DB_FILE
  sqlite3 $DB_FILE < $INIT_SQL
  echo "Database initialized."
else
  echo "Database file $DB_FILE already exists. Skipping initialization."
fi

# Start the nodejs application
echo "Starting nodejs application..."
exec node app.js

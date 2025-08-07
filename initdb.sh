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

#echo "init db"
#touch $DB_FILE
#sqlite3 $DB_FILE < $INIT_SQL
#echo "Variable DB_DIR is: $DB_DIR"
#echo "Variable INIT_SQL is: $INIT_SQL"
#
#echo "done init"


#echo "Checking for database existence..."
#
## Check if the database file exists in the mounted volume
#if [ ! -f "$DB_FILE" ]; then
#  echo "Database file '$DB_FILE' not found. Initializing database..."
#  mkdir -p "$DB_DIR" # Ensure the directory exists in case the volume is completely empty
#  touch "$DB_FILE"
#  sqlite3 /app/db/database.db < /app/db/initdb.sql
#  echo "Database initialized."
#else
#  echo "Database file '$DB_FILE' already exists. Skipping initialization."
#fi

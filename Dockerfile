# Use the Arch Linux base image
FROM archlinux

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Update the package lists, install Node.js, PostgreSQL, npm, and install npm dependencies
RUN pacman -Sy nodejs postgresql npm --noconfirm && npm install && \
    # Create the directory for PostgreSQL to, change its ownership to the postgres user and initialize the database
    mkdir /var/run/postgresql && chown -R postgres:postgres /var/run/postgresql && su - postgres -c "initdb -D /var/lib/postgres/data" && \
    # Start the PostgreSQL database
    su - postgres -c "pg_ctl -D /var/lib/postgres/data start -l /var/lib/postgres/data/logfile" && \
    # Setup the PostgreSQL tables and populate them with data
    su - postgres -c "psql -f /app/server/DB/setup.sql" && npm run resetdb

# Start the PostgreSQL server and Node.JS back-end server //tail -f /var/lib/postgres/data/logfile
CMD su - postgres -c "pg_ctl -D /var/lib/postgres/data start -l /var/lib/postgres/data/logfile" && npm run main

# Make the Node.JS front-end server available on port 3001, and back-end server on port 3000
# front-end server
EXPOSE 3000
# back-end server
EXPOSE 3001
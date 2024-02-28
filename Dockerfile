# Use the Alpine Linux base image
FROM alpine:3.19.1

# Set the working directory to /app
WORKDIR /app

# Copy the necessary files into the container at /app
COPY ./src ./src
COPY ./package.json ./

# Installing Node.js LTS and PostgreSQL packages
RUN apk add nodejs-lts postgresql npm && \
    # Install the Node.js dependencies
    npm install && \
    # Create and give permission to the necessary folders for PostgreSQL to work
    mkdir -p /run/postgresql && chown postgres:postgres /run/postgresql && \
    # Initialize the database
    su - postgres -c "initdb -D /var/lib/postgresql/data" && \
    # Start the database
    su - postgres -c "pg_ctl -D /var/lib/postgresql/data start -l /var/lib/postgresql/data/logfile" && \
    # Setup the tables
    psql -U postgres -f src/server/DB/setup.sql && \
    # Populate database with data
    npm run resetdb && \
    # Stop the server
    su - postgres -c "pg_ctl -D /var/lib/postgresql/data stop" 

# Start the PostgreSQL server and the webserver
CMD su - postgres -c "pg_ctl -D /var/lib/postgresql/data start -l /var/lib/postgresql/data/logfile" && \
    npm run main

# expose port 3000
EXPOSE 3000
# DLSU ID Scanner Server

## Requirements
- Nodejs (^16.0)
- Yarn
- Redis
- PostgreSQL

## Setup

### Yarn

Install the nodejs packages with
```bash
path/to/server> yarn
```

### Database

Look into the `db/init.sql` and run that within the postgres terminal

To migrate the tables run the following commands:
```bash
# Creates the tables
path/to/server> yarn db-up

# Drops the tables
path/to/server> yarn db-down

# Insert initial data
path/to/server> yarn db-ins

# Delete data
path/to/server> yarn db-del

# Shortcut to run down, up and ins in that sequence
path/to/server> yarn db-reset
```

### Dev

To run the server
```
path/to/server> yarn dev
```

### Build

To build the server
```
path/to/server> yarn build
```

This will build a dist folder, that will be used for production use


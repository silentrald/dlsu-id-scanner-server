CREATE DATABASE id_scan_db;
CREATE ROLE id_scan_user WITH LOGIN PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE id_scan_db TO id_scan_user;

\c id_scan_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\q

-- psql -h localhost -p 5432 -U id_scan_user -W -d id_scan_db

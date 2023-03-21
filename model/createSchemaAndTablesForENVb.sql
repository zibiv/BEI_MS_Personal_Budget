-- Active: 1678801485485@@127.0.0.1@5432@envb
DROP SCHEMA IF EXISTS envb_user CASCADE;
CREATE SCHEMA envb_user;
SET search_path = envb_user;

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  income FLOAT NOT NULL,
  email VARCHAR(50) NOT NULL,
  hashed_password VARCHAR(32) NOT NULL,
  firstName VARCHAR(50)
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  isYearly BOOLEAN DEFAULT true
);
CREATE TABLE envelopes (
  id VARCHAR(36) PRIMARY KEY,
  budget FLOAT NOT NULL,
  name VARCHAR(50),
  owner_ID VARCHAR(36) REFERENCES users (id),
  category_ID INTEGER
);
ALTER TABLE envelopes
ADD CONSTRAINT envelopes_category_id_fkey FOREIGN KEY (category_ID) REFERENCES categories(id);

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE envb FROM PUBLIC;
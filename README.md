# makersbnb
Team 1 makersbnb repository 

# Making databases 

CREATE DATABASE makersbnb;
\c makersbnb;
CREATE EXTENSION pgcrypto;
CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE spaces (id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, cost FLOAT4 NOT NULL);
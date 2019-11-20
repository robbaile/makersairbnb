# makersbnb
Team 1 makersbnb repository 

# Making databases 

CREATE DATABASE makersbnb;
\c makersbnb;
CREATE EXTENSION pgcrypto;
CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
CREATE TABLE spaces (id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, cost FLOAT4 NOT NULL);


# Changes to database 

We now need to run some other commands to keep our database working

ALTER TABLE spaces ADD COLUMN userId int;
ALTER TABLE spaces ADD FOREIGN KEY (userId) REFERENCES users(id);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    userId int FOREIGN KEY REFERENCES users(id),
    spacesId int FOREIGN KEY REFERENCES spaces(id)
);
# makersbnb team project
Team 1 makersbnb repository 
by Rob, Tomas, Kris, Migle and Sarah

This was a week long project with the aim of recreating the functionality of Airbnb. 

## How to use this repo:
+ Fork it
+ Clone it to your device
+ cd into the `makersairbnb`
+ `npm install` will install all the required dependencies
+ Next use the database instructions below to create the database locally 
+ once the database is created, run 'npm run watch' to start the app

## Making the database
These commands are for setting up the database locally using postgres. We need this to run the application

+ Open a terminal and run following commands 'psql postgres'
+ 'CREATE DATABASE makersbnb';
+ \c makersbnb;
+ CREATE EXTENSION pgcrypto;
+ CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);
+ CREATE TABLE spaces (id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, cost FLOAT4 NOT NULL, userId int, FOREIGN KEY (userId) REFERENCES users(id));
+ CREATE TABLE bookings (id SERIAL PRIMARY KEY, startDate DATE NOT NULL, endDate DATE NOT NULL, userId int, spacesId int, FOREIGN KEY (spacesId) REFERENCES spaces(id), FOREIGN KEY (userId) REFERENCES users(id));

## Headline specifications:

+ A user can sign up
+ A signed up user can log in
+ User can view all the properties on the site
+ User can view the properties that belong to them
+ User can view all the bookings they have made
+ User can view details of the property that they are interested in booking
+ User can add the dates they wish to stay at the property and a price is calculated
+ User can book the dates of the property (Currently no validation for this)

## Technologies used

+ Postgres 
+ Node.js/Express.js
+ Handlebars-express for the html view engine
+ Some javascript for the DOM
+ custom CSS and some bootstrap


## Left to do

+ Move the logic out of the server.js and into classes
+ Add validation to bookings i.e you cannot book a place that is already booked 

## Week timeline

+ Monday - Planned technologies, layout and specs - Started development
+ Tuesday - Created login/signup backend and views for this 
+ Wednesday - Created all properties page, single property page and set up sessions 
+ Thursday - Created view my properties, view my bookings and set up book property 
+ Friday - Reviewed and brushed up CSS 

## Takeaways from the week 

+ Plan a little more before we start coding
+ Pick a technology that more people are familiar with (Ruby would have been a better option here)
+ Regular team checkins to see blockers and what work people can pick up (especially for a short project like this)

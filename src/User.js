"use strict";

class User {
  constructor(username, password, email){
    this._email = email;
    this._username = username;
    this._password = password;
    this._properties = [];
    this._bookings = [];
  }

  getUsername() {
    return this._username;
  }

  getSpaces() {
    return this._properties;
  }

  getBookings() {
    return this._bookings;
  }

  bookSpace(bookedSpace) {
    this._bookings.push(bookedSpace);
  }

 

  createSpace(createdSpace) {
    this._properties.push(createdSpace);
  }

  editPost() {
    
  }

  approveBooking(space) {
    if (this._properties.includes(space)) {
      space.setApproval();
    }
  }
}

module.exports = User;
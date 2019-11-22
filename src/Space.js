"use strict";

class Space {
  constructor(name, description, cost, availability) {
    this._name = name;
    this._description = description;
    this._cost = cost;
    this._availability = availability;
    this._approved = false;
  }

  setName(newName) {
    this._name = newName;
  }

  setApproval() {
    if (this._approved == false) {
      this._approved = true;
    } else {
      this._approved = false;
    }
  }

  setDescription(description) {
    this._description = description;
  }

  setCost(cost) {
    this._cost = cost;
  }

  setAvailability(availability) {
    this._availability = availability;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getCost() {
    return this._cost;
  }

  getAvailability() {
    return this._availability;
  }
}
module.exports = Space;

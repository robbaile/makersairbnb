'use strict';

describe('User', function(){
  var user;
  beforeEach(function(){
    user = new User('User Name', 'userpassword', 'user@testmail.com');
  });

  it('is an instance of User', function(){
    expect(user).toBeInstanceOf(User);
  });

  it('is constructed with required parameters', function(){
    expect(user._username).toEqual('User Name');
    expect(user._password).toEqual('userpassword');
    expect(user._email).toEqual('user@testmail.com');
    expect(user._bookings).toEqual([]);
    expect(user._properties).toEqual([]);
  });

  it('can get the username of a User', function(){
    user.getUsername();
    expect(user._username).toEqual('User Name');
  });

  it('can list the spaces a User has to let', function(){
    //test needs class to have ability to add an instance of Space to _properties
    user.getSpaces();
    expect(user._properties).toEqual([]);
  });

  it('can book a space', function(){
    user.bookSpace();
    expect(user._bookings.length).toEqual(1);
  });
  
  it('can list the spaces a User has booked', function(){
    //test needs class to have ability to add an instance of Space to _bookings
    user.bookSpace("test booking");
    user.getBookings();
    expect(user._bookings).toEqual(["test booking"]);
  });

  

});
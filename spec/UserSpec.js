'use strict';

describe('User', function(){
  var user;
  var space;
  beforeEach(function(){
    user = new User('User Name', 'userpassword', 'user@testmail.com');
    space = jasmine.createSpyObj('space',['setApproval']);
    space.setApproval = jasmine.createSpy(space._approved = true);
    
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
    user.createSpace(space);
    user.getSpaces();
    expect(user._properties).toEqual([space]);
  });

  it('can book a space', function(){
    user.bookSpace();
    expect(user._bookings.length).toEqual(1);
  });
  
  it('User can book a space and list the spaces a User has booked', function(){
    user.bookSpace("test booking");
    user.getBookings();
    expect(user._bookings).toEqual(["test booking"]);
  });

  it('User can approve the booking of a space', function(){
    user.bookSpace(space);
    user.approveBooking(space);
    expect(space._approved).toEqual(true);
  });
});
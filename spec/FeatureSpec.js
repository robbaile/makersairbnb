'use strict';

describe('Feature Test:', function(){
  var user;
  var space;

  beforeEach(function(){
    user = new User('User Name', 'userpassword', 'user@testmail.com');
    space = new Space('Testname', 'Testdescription', '£100', 'Available: 20/11/2019 - 30/11/2019');
  });

  it('can allow a User to create a new instance of Space', function(){
    user.createSpace(space);
    expect(user._properties[0]).toBeInstanceOf(Space);
  });

  it('can allow a User to save a new Space to list', function(){
    user.createSpace(space);
    expect(user._properties).toEqual([space]);
  });

  it('can allow a User to approve the booking of a Space', function(){
    user.createSpace(space);
    user.approveBooking(space);
    expect(space._approved).toEqual(true)
  });

  

  

});
'use strict';

describe('Space', function(){
  var space;
  beforeEach(function(){
    space = new Space('Testname', 'Testdescription', '£100', 'Available: 20/11/2019 - 30/11/2019');
  });

  it('is an instance of Space', function(){
    expect(space).toBeInstanceOf(Space);
  });

  it('is constructed with required parameters', function(){
    expect(space._name).toEqual('Testname');
    expect(space._description).toEqual('Testdescription');
    expect(space._cost).toEqual('£100');
    expect(space._availability).toEqual('Available: 20/11/2019 - 30/11/2019');
    expect(space._approved).toEqual(false)
  });

  it('can change the name of a Space', function(){
    space.setName('New Name');
    expect(space._name).toEqual('New Name');
  });

  it('can change the description of a Space', function(){
    space.setDescription('New Description');
    expect(space._description).toEqual('New Description');
  });

  it('can change the cost of a Space', function(){
    space.setCost('£120');
    expect(space._cost).toEqual('£120');
  });
  
  it('can change the availability of a Space', function(){
    space.setAvailability('Available: 25/11/2019 - 10/12/2019');
    expect(space._availability).toEqual('Available: 25/11/2019 - 10/12/2019');
  });

  it('can approve a rental', function(){
    space.setApproval();
    expect(space._approved).toEqual(true);
  });

  it('can get the name of a Space', function(){
    space.getName();
    expect(space._name).toEqual('Testname');
  });

  it('can get the description of a Space', function(){
    space.getDescription();
    expect(space._description).toEqual('Testdescription');
  });

  it('can get the cost of a Space', function(){
    space.getCost();
    expect(space._cost).toEqual('£100');
  });
  
  it('can get the availability of a Space', function(){
    space.getAvailability();
    expect(space._availability).toEqual('Available: 20/11/2019 - 30/11/2019');
  });
});
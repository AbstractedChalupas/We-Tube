'use strict';

describe('streamController module', function () {
  var $scope, $rootScope, createController, Links, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    // $httpBackend = $injector.get('$httpBackend');
    //example code, may be usefull
    // Links = $injector.get('Links');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('StreamController', {
        $scope: $scope,
      });
    };
  }));

  it('should have a embed property on the $scope', function () {
    createController();
    expect($scope.embed).to.be.a('string');
  });

  it('should have a method submitUrl', function(){
    createController();
    expect($scope.submitUrl).to.be.a('function')
  });

  it('should modify the embed variable when submitUrl is called', function(){
    createController();
    $scope.startTime = 0;
    //this is a tempory fix, must be changed later
    var data = ".comv=data"
    var modifiedEmbed = $scope.embed + "data" + "?autoplay=1"
    $scope.submitUrl(data);
    expect($scope.embed).to.equal(modifiedEmbed)
  })

  it('should add a start time to the embed variable when startTime is present', function(){
    createController();
    $scope.startTime = 120;
    //this is a tempory fix, must be changed later
    var data = ".comv=data"
    var modifiedEmbed = $scope.embed + "data?autoplay=1&start=120"
    $scope.submitUrl(data);
    expect($scope.embed).to.equal(modifiedEmbed)
  })

});

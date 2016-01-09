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

  it('should have a videoId property on the $scope', function () {
    createController();
    expect($scope.videoId).to.be.a('string');
  });

  it('should have a method submitUrl', function(){
    createController();
    expect($scope.submitUrl).to.be.a('function')
  });

  it('should modify the videoId variable when submitUrl is called', function(){
    createController();
    $scope.startTime = 0;
    //this is a tempory fix, must be changed later
    var data = "https://www.youtube.com/watch?v=5if-d-JhRKc"
    var modifiedVideoId = "5if-d-JhRKc"
    $scope.submitUrl(data);
    expect($scope.videoId).to.equal(modifiedVideoId)
  })

});

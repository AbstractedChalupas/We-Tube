'use strict';

describe('appController module', function () {
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
      return $controller('appController', {
        $scope: $scope,
      });
    };

  }));

  it('should have a hello property on the $scope', function () {
    createController();
    expect($scope.hello).to.be.an('string');
  });

  // it('should call `Links.getAll()` when controller is loaded', function () {
  //   sinon.spy(Links, 'getAll');
  //   $httpBackend.expectGET('/api/links').respond(200);

  //   createController();
  //   $httpBackend.flush();

  //   expect(Links.getAll.called).to.equal(true);
  //   Links.getAll.restore();
  // });

  // it('should populate the data property after the call to `Links.getAll()`', function () {
  //   var mockLinks = [{link: "link1"},{two: 'link2'},{three: 'link3'}];
  //   $httpBackend.expectGET('/api/links').respond(mockLinks);

  //   createController();
  //   $httpBackend.flush();

  //   expect($scope.data.links).to.deep.equal(mockLinks);
  // });
});

'use strict';

describe('Services', function () {
  beforeEach(module('services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


  describe('OAuth Factory', function () {
    var $httpBackend, OAuth;

    beforeEach(inject(function (_$httpBackend_, _OAuth_) {
      $httpBackend = _$httpBackend_;
      OAuth = _OAuth_;
    }));

    it('should exist', function () {
      expect(OAuth).to.exist;
    });

    it('should have a method `googleLogin`', function () {
      expect(OAuth.googleLogin).to.be.a('function');
    });

    xit('should return an object `googleLogin`', function () {
      var data = undefined;
      var mockResponse = undefined;
      $httpBackend.expect('POST', '/api/links').respond(mockResponse);

      OAuth.googleLogin(data).then(function (response) {
        expect(response).to.deep.equal(mockResponse);
      });

      $httpBackend.flush();
    });
  });

  describe('getVideo Factory', function () {
    var $httpBackend, getVideo;

    beforeEach(inject(function (_$httpBackend_, _getVideo_) {
      $httpBackend = _$httpBackend_;
      getVideo = _getVideo_;
    }));

    it('should exist', function () {
      expect(getVideo).to.exist;
    });

    it('should have a method `videoDetails`', function () {
      expect(getVideo.videoDetails).to.be.a('function');
    });

    xit('should return an object `videoDetails`', function () {
      //some sort of object, don't have details on it's structure yet
      var mockResponse = undefined;
      $httpBackend.expect('POST', '/api/links').respond(mockResponse);

      getVideo.videoDetails(function (response) {
        expect(response).to.deep.equal(mockResponse);
      });

      $httpBackend.flush();
    });    
  });
});

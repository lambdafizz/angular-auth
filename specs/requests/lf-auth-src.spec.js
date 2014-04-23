(function (module, inject, angular) {
'use strict';


describe('lf-auth-src directive', function () {

    var template = '<img lf-auth-src="{{ sourceUrl }}">';

    beforeEach(module('lf.auth.requests', function ($provide) {
        $provide.service('$window', function () {
            var self = this;
            this.uuid = 'data';
            this.URL = {
                createObjectURL: function (o) { return 'blob://' + self.uuid; }
            };
            this.Blob = function (s) {};
        });
    }));
    var $rootScope;
    var $httpBackend;
    var lfAuthSrc;
    beforeEach(inject(function ($compile, _$rootScope_, _$httpBackend_, $window) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        lfAuthSrc = $compile(angular.element(template));
    }));

    it('when no elem on scope src should be empty (default dom value)', function () {
        var img = lfAuthSrc($rootScope);
        $rootScope.$digest();
        expect(img.prop('src')).toEqual('');
    });

    it('when elem on scope should hit HTTP', function () {
        var img = lfAuthSrc($rootScope);
        $rootScope.sourceUrl = 'image.png';
        $httpBackend.expectGET('image.png').respond('some data');
        $rootScope.$digest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('when elem on scope should set src to url of returned blob', function () {
        var img = lfAuthSrc($rootScope);
        $rootScope.sourceUrl = 'image.png';
        $httpBackend.expectGET('image.png').respond('hello data');
        $rootScope.$digest();
        $httpBackend.flush();
        expect(img.prop('src')).toEqual('blob://data');
    });

    it('when response status is of error class whould set src to blank', function () {
        var img = lfAuthSrc($rootScope);
        $rootScope.sourceUrl = 'image.png';
        $httpBackend.expectGET('image.png').respond(401, 'some data');
        $rootScope.$digest();
        $httpBackend.flush();
        expect(img.prop('src')).toEqual('');
    });

    it('when lf-auth-src property changes should change the src',
        inject(function ($window) {

        var img = lfAuthSrc($rootScope);
        $rootScope.sourceUrl = 'image.png';
        $httpBackend.expectGET('image.png').respond('image.png');
        $rootScope.$digest();
        $httpBackend.expectGET('other.png').respond('other.png');
        $rootScope.sourceUrl = 'other.png';
        $window.uuid = 'other';
        $rootScope.$digest();
        $httpBackend.flush();
        expect(img.prop('src')).toEqual('blob://other');
    }));

});


})(window.angular.mock.module, window.angular.mock.inject, window.angular);
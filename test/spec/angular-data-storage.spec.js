'use strict';

describe('Angular Data Storage', function () {
    var scope1, scope2;

    function ctrl1($rootScope) {
        scope1 = $rootScope.$new();
    }

    function ctrl2($rootScope) {
        scope2 = $rootScope.$new();
    }

    beforeEach(module('AngularDataStorage'));
    beforeEach(inject(function ($rootScope) {
        ctrl1($rootScope);
        ctrl2($rootScope);
    }));

    it('should return the value1 for object1', inject(function (angularDataStorageService) {
        angularDataStorageService.save('object1', 'value1');

        var obj1 = angularDataStorageService.get('object1');
        expect(obj1).not.toBeNull();
        expect(obj1).toBe('value1');
    }));

    it('should return the value1 for object1 destroying from storage', inject(function (angularDataStorageService) {
        angularDataStorageService.save('object1', 'value1');

        var obj1 = angularDataStorageService.get('object1', {'destroy': true})
        expect(obj1).not.toBeNull();
        expect(obj1).toBe('value1');
        var obj2 = angularDataStorageService.get('object1');
        expect(obj2).toBeNull();
    }));

    it('should scope1 set value for the provider', inject(function (angularDataStorageService) {
        scope1.value = 'banana';
        expect(scope1.value).toBe('banana');

        angularDataStorageService.save('bnn', scope1.value);
        var value = angularDataStorageService.get('bnn');
        expect(value).toBe('banana');
    }));

    it('should scope1 set value for the provider and scope2 retrieve and set on itself ', inject(function (angularDataStorageService) {
        scope1.value = 'banana';
        expect(scope1.value).toBe('banana');
        expect(scope2.value).toBeUndefined();

        angularDataStorageService.save('bnn', scope1.value);
        scope2.value = angularDataStorageService.get('bnn');
        expect(scope1.value).toBe('banana');
        expect(scope2.value).toBe('banana');
    }));

    it('should not data interfere with origin objects with default options', inject(function (angularDataStorageService) {
        scope1.value = 'banana';
        expect(scope1.value).toBe('banana');

        angularDataStorageService.save('bnn', scope1.value);
        scope2.value = angularDataStorageService.get('bnn');
        expect(scope1.value).toBe('banana');
        expect(scope2.value).toBe('banana');

        scope1.value = 'apple';
        expect(scope1.value).toBe('apple');
        expect(scope2.value).toBe('banana');
    }));


});
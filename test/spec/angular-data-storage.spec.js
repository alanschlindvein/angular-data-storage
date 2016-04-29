'use strict';

describe('Angular Data Storage', function () {
    var firstCrlScope, secondCrlScope, rootScope, fooForSpy;

    function firstCtrl() {
	    firstCrlScope = rootScope.$new();
    }

    function secondCtrl() {
	    secondCrlScope = rootScope.$new();
    }

    beforeEach(module('AngularDataStorage'));
    beforeEach(inject(function($injector) {
	    rootScope = $injector.get('$rootScope');

	    firstCtrl();
	    secondCtrl();

	    fooForSpy = {
		    print: function() {
			    console.log('print');
		    },
		    save: function() {
			    console.log('save');
		    },
		    update: function() {
			    console.log('update');
		    }
	    };
	    spyOn(fooForSpy, 'print').and.callThrough();
	    spyOn(fooForSpy, 'save').and.callThrough();
	    spyOn(fooForSpy, 'update').and.callThrough();

	    spyOn(rootScope, '$broadcast');
    }));

    it('should save and get value', inject(function(angularDataStorageService) {
	    try {
	        angularDataStorageService.save('foo', 0);
        } catch(e) {
	        expect(e).toBeNull();
        }
	    var foo;
	    try {
		    foo = angularDataStorageService.get('foo');
	    } catch(e) {
		    expect(e).toBeNull();
	    }
        expect(foo).not.toBeNull();
        expect(foo).toBe(0);
    }));

	it('should return the value and destroy the register', inject(function(angularDataStorageService) {
        try {
	        angularDataStorageService.save('foo', 'foo');
        } catch(e) {
	        expect(e).toBeNull();
        }
        var foo, dFoo;
		try {
			foo = angularDataStorageService.get('foo', {destroy: true});
			dFoo = angularDataStorageService.get('foo');
		} catch(e) {
			expect(e).toBeNull();
		}
        expect(foo).toBe('foo');
        expect(dFoo).toBeNull();
    }));

	it('should delete key', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo');
		} catch(e) {
			expect(e).toBeNull();
		}
		try {
			angularDataStorageService.delete('foo');
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(angularDataStorageService.get('foo')).toBeNull();
	}));

	it('should clear all keys', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo');
			angularDataStorageService.save('bar', 'bar');
		} catch(e) {
			expect(e).toBeNull();
		}
		angularDataStorageService.clearAll();
		expect(angularDataStorageService.get('foo')).toBeNull();
		expect(angularDataStorageService.get('bar')).toBeNull();
	}));

	it('should get all keys', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo');
			angularDataStorageService.save('bar', 'bar');
			angularDataStorageService.save('bee', 'bee');
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(angularDataStorageService.getAllKeys()).toEqual(['foo', 'bar', 'bee']);
	}));

	it('should notify when saved', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo', {notify: true});
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(rootScope.$broadcast).toHaveBeenCalledWith('storage.foo.saved', 'foo');
	}));

	it('should notify when used with get function', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo');
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(angularDataStorageService.get('foo', {notify: true})).toBe('foo');
		expect(rootScope.$broadcast).toHaveBeenCalledWith('storage.foo.used', 'foo');
	}));

	it('should notify when destroyed with get function', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo');
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(angularDataStorageService.get('foo', {destroy: true, notify: true})).toBe('foo');
		expect(rootScope.$broadcast).toHaveBeenCalledWith('storage.foo.destroyed');
	}));

	it('should notify when destroyed and used with get function', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.save('foo', 'foo');
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(angularDataStorageService.get('foo', {destroy: true, notify: true})).toBe('foo');
		expect(rootScope.$broadcast).toHaveBeenCalledWith('storage.foo.destroyed');
		expect(rootScope.$broadcast).toHaveBeenCalledWith('storage.foo.used', 'foo');
	}));

	it('should notify when destroyed', inject(function(angularDataStorageService) {
		try {
			angularDataStorageService.delete('foo', {notify: true});
		} catch(e) {
			expect(e).toBeNull();
		}
		expect(rootScope.$broadcast).toHaveBeenCalledWith('storage.foo.destroyed');
	}));
});
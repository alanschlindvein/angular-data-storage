'use strict';

describe('Angular Data Storage', function() {
   var funcToSpy;

   beforeEach(module('AngularDataStorage'));
   beforeEach(inject(function() {

      funcToSpy = {
         update: function() {
            console.log('update');
         }
      };
      spyOn(funcToSpy, 'update').and.callThrough();
   }));

   it('should save and fetch value', inject(function(dataStorageService) {
      dataStorageService.save('foo', 'foo');

      var foo = dataStorageService.fetch('foo');
      expect(foo).not.toBeNull();
      expect(foo).toBe('foo');
   }));

   it('should delete key', inject(function(dataStorageService) {
      dataStorageService.save('foo', 'foo');

      dataStorageService.delete('foo');

      expect(dataStorageService.length()).toBe(0);
   }));

   it('should delete many keys', inject(function(dataStorageService) {
      dataStorageService.save('foo', 'foo');
      dataStorageService.save('bar', 'bar');
      dataStorageService.save('tot', 'tot');

      dataStorageService.delete('foo', 'bar', 'tot');

      expect(dataStorageService.length()).toBe(0);
   }));

   it('should save and fetch functions', inject(function(dataStorageService) {
      dataStorageService.save('update', funcToSpy.update);

      dataStorageService.fetch('update')();

      expect(funcToSpy.update).toHaveBeenCalled();
   }));

   it('should clear all keys', inject(function(dataStorageService) {
      dataStorageService.save('foo', 'foo');
      dataStorageService.save('bar', 'bar');

      dataStorageService.clearAll();

      expect(dataStorageService.fetch('foo')).toBeNull();
      expect(dataStorageService.fetch('bar')).toBeNull();
   }));

   it('should fetch all keys', inject(function(dataStorageService) {
      dataStorageService.save('foo', 'foo');
      dataStorageService.save('bar', 'bar');
      dataStorageService.save('bee', 'bee');

      expect(dataStorageService.allKeys()).toEqual(['foo', 'bar', 'bee']);
   }));

   it('should return dataStorage length', inject(function(dataStorageService) {
      dataStorageService.save('foo', 'foo');
      dataStorageService.save('bar', 'bar');
      dataStorageService.save('bee', 'bee');

      expect(dataStorageService.length()).toBe(3);
   }));
});

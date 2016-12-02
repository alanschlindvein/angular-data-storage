/**
 * An Angular module to storage data
 * @version v1.0.0 - 2016-12-02
 * @link https://github.com/alanschlindvein/angular-data-storage
 * @author alanschlindvein <alansaraujo.schlindvein@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, angular) {
angular
   .module('AngularDataStorage', [])
   .service('dataStorageService', dataStorageService);

   function dataStorageService() {
      var self = this,
         saver = {},
         keyError = 'Key needs to be string.',
         argumentsError = 'You need pass at least one key';

      function isInvalidKey(key) {
         return typeof key !== 'string';
      }

      this.fetch = function(key) {
         if(isInvalidKey(key)) {
            throw keyError;
         }
         var value = saver[key];
         return (typeof value !== 'undefined') ? value : null;
      };

      this.save = function(key, value) {
         if(isInvalidKey(key)) {
            throw keyError;
         }
         saver[key] = value;
      };

      this.delete = function() {
         if(!arguments.length) {
            throw argumentsError;
         }
         for(var i = 0; i < arguments.length; i++) {
            if(isInvalidKey(arguments[i])) {
               throw keyError;
            }
            delete saver[arguments[i]];
         }
      };

      this.allKeys = function() {
         return Object.keys(saver);
      };

      this.clearAll = function() {
         saver = {};
      };

      this.length = function() {
         return self.allKeys().length;
      }
   }
})(window, window.angular);
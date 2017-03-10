/**
 * An Angular module to storage data
 * @version v1.1.0 - 2017-03-10
 * @link https://github.com/alanschlindvein/angular-data-storage
 * @author alanschlindvein <alansaraujo.schlindvein@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, angular) {
(function(factory) {
  'use strict';
  if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(typeof angular !== 'undefined' ? angular : require('angular'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else {
    // Browser globals
    if (typeof angular === 'undefined') {
      throw new Error('AngularJS framework needs to be included, see https://angularjs.org/');
    }
    factory(angular);
  }
}(function(angular) {
  'use strict';

  return angular
    .module('AngularDataStorage', [])
    .service('dataStorageService', dataStorageService);

  function dataStorageService() {
    var self = this,
      saver = {},
      error = {
        key: 'Key needs to be string.',
        arguments: 'You need pass at least one key'
      };

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
}));
})(window, window.angular);
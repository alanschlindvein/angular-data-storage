/**
 * An Angular module to storage data
 * @version v0.1.0 - 2016-04-29
 * @link https://github.com/alanschlindvein/angular-data-storage
 * @author alanschlindvein <alansaraujo.schlindvein@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, angular) {
angular
    .module('AngularDataStorage', [])
    .service('angularDataStorageService', ['$rootScope', function($rootScope) {
		var saver = {};

		var isInvalidKey = function(key) {
			return (angular.isUndefined(key) || typeof key !== 'string');
		};

		this.get = function(key, options) {
			if(angular.isUndefined(key)){
				throw 'Failed to execute \'get\'.';
			}
			var value = angular.copy(saver[key]);
			if(options) {
				if(angular.isDefined(options.destroy) && options.destroy) {
					delete saver[key];
					(options.notify) && $rootScope.$broadcast('storage.' + key + '.destroyed');
				}
				(options.notify) && $rootScope.$broadcast('storage.' + key + '.used', angular.isUndefined(value) ? null : value);
			}
			return angular.isUndefined(value) ? null : value;
		};

		this.save = function(key, value, options) {
			if(isInvalidKey(key) || angular.isUndefined(value)) {
				throw 'Failed to execute \'save\'.';
			}
			saver[key] = angular.copy(value);
			if(options) {
				(options.notify) && $rootScope.$broadcast('storage.' + key + '.saved', angular.isUndefined(value) ? null : value);
			}
		};

		this.delete = function(key, options) {
			if(isInvalidKey(key)) {
				throw 'Failed to execute \'delete\'.';
			}
			delete saver[key];
			if(options) {
				(options.notify) && $rootScope.$broadcast('storage.' + key + '.destroyed');
			}
		};

		this.getAllKeys = function() {
			return Object.keys(saver);
		};

		this.clearAll = function(options) {
			saver = {};
			if(options) {
				(options.notify) && $rootScope.$broadcast('storage.empty');
			}
		};
    }]);
})(window, window.angular);
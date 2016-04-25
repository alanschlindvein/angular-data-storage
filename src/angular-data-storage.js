angular
    .module('AngularDataStorage', [])
    .provider('angularDataStorageService', function () {

        var parameters = {};

        this.$get = function () {

            //options destroy: Boolean
            var getFromStorage = function (key, options) {
                if(angular.isUndefined(key)){
                    throw 'The key cannot be undefined';
                }
                var value = angular.copy(parameters[key]);
                console.log('The value:' + value);
                if(angular.isDefined(options) &&  angular.isDefined(options.destroy) && options.destroy){
                    parameters[key] = null;
                }
                return value;
            };

            //options asRef: Boolean cached: Boolean
            var saveOnStorage = function (key, value, options) {
                if(angular.isUndefined(key)){
                    throw 'The key cannot be undefined';
                }

                if(angular.isDefined(options)) {
                    if (angular.isDefined(options.cached) && options.cached) {
                        console.log("Save asCached");
                        return this;
                    }
                    if (angular.isDefined(options.asRef) && options.asRef) {
                        console.log("Save asRef");
                        return this;
                    }
                }
                parameters[key] = angular.copy(value);
                return this;
            };

            var deleteFromStorage = function (key) {

            };

            var getAllKeysFromStorage = function () {
                //return parameters.keys();
            };

            var clearAllInStorage = function () {
                //parameters.clear();
            };

            var eventChangeOnStorage = function (key, callback) {

            };

            var eventAddedOnStorage = function (key, callback) {

            };

            var eventDeletedFromStorage = function (key, callback) {

            };

            var addToCache = function (key) {

            };

            return {
                get: getFromStorage,
                save: saveOnStorage,
                delete: deleteFromStorage,
                keys: getAllKeysFromStorage,
                clearAll: clearAllInStorage,
                onChanged: eventChangeOnStorage,
                onAdded: eventAddedOnStorage,
                onDeleted: eventDeletedFromStorage,
                toCache: addToCache
            };
        };
    });

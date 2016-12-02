angular-data-storage
=====================
An Angular module to storage data.

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/angular-data-storage.svg?style=flat-square
[npm-url]: https://npmjs.org/package/angular-data-storage
[license-image]: http://img.shields.io/npm/l/angular-data-storage.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/angular-data-storage.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/angular-data-storage

## Table of contents:
##Table of contents:
- [Get Started](#get-started)
- [API Documentation](#api-documentation)
 - [save](#save)
 - [fetch](#fetch)
 - [delete](#delete)
 - [clearAll](#clearall)
 - [allKeys](#allKeys)
 - [length](#length)

## Get Started
**(1)** You can install angular-data-storage using 3 different ways:<br/>
**Git:**
clone & build [this](https://github.com/alanschlindvein/angular-data-storage.git) repository<br/>
**Bower:**
```bash
$ bower install angular-data-storage --save
```
**npm:**
```bash
$ npm install angular-data-storage
```
**(2)** Include `angular-data-storage.js` (or `angular-data-storage.min.js`) from the [dist](https://github.com/alanschlindvein/angular-data-storage/tree/master/dist) directory in your `index.html`, after including Angular itself.

**(3)** Add `'AngularDataStorage'` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>

</head>
<body>
    ...
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="bower_components/js/angular-data-storage.min.js"></script>
    ...
    <script>
        var myApp = angular.module('myApp', ['AngularDataStorage']);

    </script>
    ...
</body>
</html>
```

##API Documentation
###save
Directly save a value to storage.<br/>
```js
myApp.controller('MainCtrl', function($scope, dataStorageService) {
  //...
  function submit(key, val) {
   return dataStorageService.save(key, val);
  }
  //...
});
```
###fetch
Directly fetch a value from storage.<br/>
**Returns:** `value from storage`
```js
myApp.controller('MainCtrl', function($scope, dataStorageService) {
  //...
  function getItem(key) {
   return dataStorageService.fetch(key);
  }
  //...
});
```
###delete
Remove an item(s) from storage by key.<br/>
```js
myApp.controller('MainCtrl', function($scope, dataStorageService) {
  //...
  function deleteItem(key) {
   return dataStorageService.delete(key);
  }
  //...
  function deleteItems(key1, key2, key3) {
   return dataStorageService.delete(key1, key2, key3);
  }
});
```
###clearAll
Remove all data from storage.<br/>
```js
myApp.controller('MainCtrl', function($scope, dataStorageService) {
  //...
  function clearAll() {
   return dataStorageService.clearAll();
  }
});
```
###allKeys
Return array of keys for storage, ignore keys that not owned.<br/>
**Returns:** `array with all keys from storage`
```js
myApp.controller('MainCtrl', function($scope, dataStorageService) {
  //...
  var lsKeys = dataStorageService.keys();
  //...
});
```
###length
Return the number of keys from storage.<br/>
**Returns:** `storage length`
```js
myApp.controller('MainCtrl', function($scope, dataStorageService) {
  //...
  function size() {
   return dataStorageService.length();
  }
  //...
});
```

/**
 * Created by Administrator on 2017/9/18.
 */

//在多个控制器中使用cacheFactory

var app=angular.module('myApp',[]);
app.factory('MyCache',function ($cacheFactory) {
	return $cacheFactory('myCache',{capacity:5});
});

app.controller('myCtrl1',['$scope','MyCache',function ($scope,cache) {
	cache.put('myValue',55);
}]);
app.controller('myCtrl2',['$scope','MyCache',function ($scope,cache) {
	$scope.value=cache.get('myValue');
}]);
 
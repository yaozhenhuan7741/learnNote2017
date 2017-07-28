/**
 * Created by Administrator on 2017/7/28.
 */

var firstApp=angular.module('firstApp',[]);
firstApp.controller('firstCtrl',function ($scope) {
	$scope.first='张';
	$scope.last ='三';
	$scope.heading = "信息: ";
	$scope.updateMessage=function () {
		$scope.message ='你好 '+ $scope.first + ''+$scope.last +'!';
	}
});
 
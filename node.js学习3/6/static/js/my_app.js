/**
 * Created by Administrator on 2017/2/6.
 */
var myApp=angular.module('myApp',[]);
myApp.controller('myController',['$scope','$http',function ($scope,$http) {
    $http.get('/user/profile').success(function (data,status,headers,config) {
        $scope.user=data;
        $scope.error="";
    }).error(function (data,status,headers,config) {
        $scope.user={};
        $scope.error=data;
    });
}]);
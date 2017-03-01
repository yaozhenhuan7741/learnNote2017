/**
 * Created by Administrator on 2017/3/1.
 */
angular.module('userApp',[])
    .controller('userCtrl',['$scope','$http',function ($scope,$http) {
        $http.get('/getUserInfo')
            .success(function (data,status,headers,config) {
                $scope.user=data;
                $scope.error="";
            })
            .error(function (data,status,headers,config) {
                $scope.user={};
                $scope.error=data;
            })
    }])

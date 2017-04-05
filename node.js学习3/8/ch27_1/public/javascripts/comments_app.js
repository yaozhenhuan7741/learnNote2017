/**
 * Created by Administrator on 2017/3/13.
 */
angular.module('myApp',[])
.controller('testCtrl',function ($scope) {
    $scope.photos=[{
        title:'aaa',
        filename:'a.jpg'
    },{
        title:'bbb',
        filename:'b.jpg'
    }];
})
.controller('photoCtrl',['$scope','$http',function ($scope,$http) {
    $scope.photos=[];
    $http.get('/photosList')
        .success(function (data) {
            console.log('获取图像列表成功！');
            $scope.photos=data;
        })
        .error(function () {
            console.log('获取图像列表失败！')
        });
}]);
/**
 * Created by Administrator on 2017/8/31.
 */

angular.module('faqApp',[])
.controller('faqCtrl',['$scope','$http',function ($scope,$http) {
	$scope.data=[];
	$http({
		url:'/faq/list',
		method:'post'
	}).success(function (data,status) {
				$scope.data = data;
	})
}]);
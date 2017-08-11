## angularjs学习整理

### 版本选择

	angularjs 1.x 和 2.x 差距很大，但是目前2.x还不稳定，这里学习以1.3版为基础版本
	
	1.2之后不再支持ie8,如果遇到需要兼容ie8的情况，使用1.2即可
	
	
#### angularjs基础

1. 各种组件和概念

- 
	- 模块(module)
	- 作用域和数据模型
	- 具有模板和指令的视图
	- 表达式
	- 控制器
	- 数据绑定
	- 服务
	- 依赖注入
	- 职责分离
	
2. Angularjs生命周期
-	
	- 引导阶段
		
			当angular.js被下载到浏览器时发生，angularjs会扫描整个页面,所以angular.js应该是最后引入的js文件之一
	- 编译阶段
	
			angularjs编译所有指令，生成动态或实时视图
	- 运行时数据绑定阶段	
	
			绑定的数据变化时，视图也跟着变	
			
3. Angularjs的全局API

全局api|说明
:---|:---
copy(src,[dst])|创建src对象的深拷贝		
element(element)|返回一个JQuery元素的DOM元素
equals(o1,o1)|进行===比较，返回布尔值
extend(dst,src)|从src对象复制所有属性到dst对象
forEach(obj,iterator,[content])|遍历ogj对象，iterator是函数，function(value,key),context充当上下文，在iterator函数中用this表示它
fromJson(json)|json字符串转JavaScript对象
toJson(obj)|JavaScript对象转json字符串
isArray()|判断是否是数组对象
isDate()|是否是Date对象
isDefined()|是否是已经定义的对象
isElement()|是否是DOM元素
isFunction()|是否是JavaScript函数
isNumber()|是否是数组
isObject()|是否是JavaScript对象
isString()|是否是String对象
isUndefined()|是否是没定义
lowercase(string)|转小写
uppercase(string)|转大写

	使用方法  angular.xxx; 如: angular.forEach(data,function(item){});   //这个等价于 data.forEach(function(item){})

	简单示例:  node_server.js  first.js first.html

4. 模块

angularjs模块被实现为两个阶段:配置阶段和运行阶段

>angluar.module(name,[requires],[configFn])
>name参数是该模块被注册在注入器服务中的名称----自定义的模块名
>requires参数是要被注入的依赖---依赖注入
>configFn参数是模块配置阶段调用的另一个函数

教程中的内容不太好理解，下面的学习通过其他教学视频来学习整理

----

下面是通过angularjs视频教程学习的笔记，该教程纯angularjs，与nodejs无关

参考网站 http://kittencup.com/

* 常用概念

	客户端模板 ： 模板和数据都会被发送到浏览器，然后在客户端进行装配
	MVC ： 模型，视图，控制器
	数据绑定 ： 双向绑定，mvvm模式，自动将model和view间的数据同步
	依赖注入 ： angularjs的依赖注入，执行的时候，会自动获取它需要的东西，而不是把所有的依赖全部创建。
	

试验代码：static下 js css

* 数据绑定
	
	ng-app 指定angularjs执行的范围和使用的模块
	angularjs的表达式 使用 {{}} ng-bind
		angular表达式，通过$parse服务解析执行
		与JavaScript表达式的区别：
			1. 属性求值，angular所有属性都是针对scope的，而JavaScript是对于window对象的
			2. 宽容 对应undefined和null，angular是宽容的，但JavaScript会报错
			3. angular表达式里没有流程控制语句
			4. 过滤器 angular可以将表达式的结果传入过滤器链
	ng-model	绑定元素，它的值就是这个元素的value值 ng-model="xxx"  使用{{xxx}}可以获取xxx的值

* 控制器	
	
	ng-controller 控制器 ng-controller="myCtrl"  myCtrl是一个函数，参数必须包含$scope，即它的作用域  (注：angular 1.6 版，不支持直接使用函数作为控制器)

* ng-bind	
	
	ng-bind 比{{}}表达式要好 解决html加载时，如果{{}}还没有被angular解析，会直接显示成{{}},客户体验不好
	
* 多个控制器，独立的作用域,但是子作用域可以读取父的属性，父的不能访问子的

* $scope的$apply方法 脏检查
		
		angular脏检查的策略
		1.不会脏检查所有对象，当对象被绑定到html中，这个对象添加为检查对象(watcher)
		2.不选脏检查所有的属性，同样，当属性被绑定后，这个属性会被列为检查的属性
		
		在angular程序初始化时，会将绑定的对象的属性添加为监听对象(wathcer)，也就是说一个对象绑定了N个属性，就会添加N个watcher
		
		angular脏检查的时机
			angular所系统的方法中都会触发比较事件，比如controller初始化的时候，所有以ng-开头的事件，都会触发脏检查
		
		手动触发脏检查
			$apply会通过$digest去触发脏检查，如果不给它参数，它会检查$scope里所有监听的属性，建议给参数，要不然会影响性能    $scope.$apply()	
		
		$scope.$apply(function (){})
		示例参见:  static/脏检查之apply.html
		

* $watch

	观察某变量，如果被观察的value与上次不一样，机会被触发
	$wathc(watchFn,watchAction,deepWatch)
	watchFn:  angular表达式或函数的字符串
	watchAction(newValue,oldValue,scope)  当watchFn发生变化时调用
	deepWatch： 默认false,如果想要监控对象的每个属性，则设置为true----指针类型的，某个属性变化时，这个指针是没有变化的，如果设置成true，就能监测到了
	
	例如，监测密码输入，密码改变一次，就记录一次次数，如果次数大于某个值，就不允许尝试了。
	示例参见：static/监测之watch.html
	
* ng-init

  ng-init="count=0";
	
* ng-class=
	
	ng-class="{classname:true}"
	试验间购物车试验
	
* ng-click

	ng-click="xxx"   xxx可以是控制器中定义的函数，也可以是表达式，比如  ng-click="cart.length=0"
	
* ng-repeat	
	
	$index 可以获取索引,即ng-repeat时数组的索引,但是,如果配合使用过滤器,$index会跟item不一致,谨慎使用
			
* angular.module('name',[,requires],[configFn])
	
	模块 一个页面只能有一个module,可以有多个控制器，其他模块，可以通过依赖注入的方式被使用
	作用域  控制器
	
	configFn   angular.config()
	
	多种使用方法，可以将控制器、工厂、服务等等，写到configFn中，也可以是使用module.xxx等便捷方法
	var myapp=angular.module('myApp',[]);
	myapp.controller();
	
	等同于：
	angular.module('myApp',[])
	.controller()
	
	即：可以通过 . 来连接
	
* $provider  

	angular使用$provider对象来实现自动依赖注入机制，注入机制通过调用一个provider的$get方法--这个是底层实现，我们一般直接使用便捷方法
			
* factory
	
	可以返回任何类型的数据
	$provider.factory('name',function(){})
	module.factory('name',function(){})
	
* service
	
	返回的必须是对象
	$provider.service()
	module.service()
	
* 使用factory和service共享数据	

	工厂、服务等，示例参见：  static/工厂服务和多控制器数据共享试验.html

* 过滤器

	{{ expression|filter}}
	{{ expression|filter1|filter2}}
	{{ expression|filter1:param1,param2... }}

* 常用过滤器

	* number
		不加参数,会为数字加上逗号 如:10000 10,000
		加参数number:3  保留3位小数
	* currency
		不加参数,会为数字加上$美元符号
		待参数,可以自定义货币符号 currency:'RMB'    100|currency:'RMB'   RMB100
	* date
		不带参数
		带参数   如: date:'short' date:'y'
			medium
			short
			fullDate
			longDate
			mediumDate
			shortDate
			mediumTime
			shortTime
			y
			yy
			yyyy
			M
			d
			m
			s
			..
	* lowercase
  * uppercase
	* json
	* limitTo
		limitTo:5
		limitTo:-5
	* orderBy
		orderBy:'name'
		orderBy:'-name'
	* filter
		filter:'a'   //只过滤值中包含'a'的, 如{name:'malei'}
		filter:{name:'a'}  //只过滤name属性的值包含a的
		filter:functionName  //使用自定义的函数来过滤,符合条件的返回true
		
		$filter注入
		```
		controller('name',function($scope,$filter){
			var num=$filter('number')(3000);   //num=3,000  $filter(过滤器名称)(参数1)(参数二)
			
			var jsonString=$filter('json')(myObj);  //jsonString 是非常便于查看的json字符串
		})
		```
* 自定义过滤器
		
		$filterProvider.register(自定义过滤器名称,function(
				return function(){}  //返回的必须是个函数
		){});
		
		module.filter()
		
		使用:  {{ expression|自定义过滤器名称 }}
		

* 购物车试验

	1. 通过ng-repeat遍历
	2. 模糊搜索
	3. 排序
	4. 总金额/总数量计算
	5. 商品移除
	6. 商品数量增加减少
	7. 清空购物车--显示相应信息
		
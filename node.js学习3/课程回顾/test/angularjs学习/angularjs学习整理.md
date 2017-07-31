## angularjs学习整理

### 版本选择

	angularjs 1.x 和 2.x 差距很大，但是目前2.x还不稳定，这里学习以1.3版为基础版本，1.3之后不再支持ie8
	
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

	使用方法  angular.xxx; 如: angular.forEach();

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
		

		


			
	
	
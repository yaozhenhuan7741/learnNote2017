## angularjs学习整理

### 版本选择

	angularjs 1.x 和 2.x 差距很大，但是目前2.x还不稳定，这里学习以1.6.5版为基础版本
	
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
			
	
	
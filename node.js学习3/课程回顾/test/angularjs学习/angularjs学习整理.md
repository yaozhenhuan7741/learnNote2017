## angularjs学习整理

### 版本选择

	angularjs 1.x 和 2.x 差距很大，但是目前2.x还不稳定，这里学习以1.3版为基础版本
	
	1.2之后不再支持ie8,如果遇到需要兼容ie8的情况，使用1.2即可
	
	
### 参考
	
	http://www.runoob.com/angularjs/angularjs-reference.html
	
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
			隐式依赖注入,即直接在函数参数中,使用$scope $http等等模块作为参数,但是这种方式,如果对使用工具对代码进行压缩,参数会被替换成其他简单变量,如a,b,导致无法注入
				如: myApp.controller('myCtrl',function($scope){})
			显示依赖注入,	使用数组,数组最后一项是函数,前边的其他项是依赖注入的模块,函数的参数,即为前边注入的模块,并且参数顺序为模块在数组中的顺序.
				如: myApp.controller('myCtrl,['$scope','$http',function(a,b){}])  //函数中a,就是$scope,b就是$http,写代码时,参数名尽量保持一致,便于理解. 

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
	控制器,应该仅仅包含单个试图所需要的业务逻辑
	不要在控制器中做的操作:
		1. 任何类型的dom操作,不要在控制器中实现,而是使用指令directive
		2. 输入格式化,使用angular form controls,不要使用控制器
		3. 输出格式化,使用过滤器
		4. 共享的代码,使用factory或service
		5. 管理其他组件的生命周期,使用module,而不要使用控制器

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
	
下面是在教程实例中出现的一些常用指令,后边有专门对指令学习的内容.
	
* ng-init

  ng-init="count=0";
	
* ng-class=
	
	ng-class="{classname:true}"
	试验间购物车试验
	
* ng-click

	ng-click="xxx"   xxx可以是控制器中定义的函数，也可以是表达式，比如  ng-click="cart.length=0"
	
* ng-repeat	

	ng-repeat="expression"  
	expression可以是:
		x in data
		{k,v} in myobj
		
	
	
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
	
* $provide  

	angular使用$provide对象来实现自动依赖注入机制，注入机制通过调用一个provider的$get方法--这个是底层实现，我们一般直接使用便捷方法
	$provide.provider
			
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
	
* 作用域的声明周期

	1. 创建
	2. 监视器注册
	3. 模型变化
	4. 变化观察
	5. 作用域销毁
	
* 作用域的层次结构
	
	树状结构，子作用域可以访问父作用域，不能访问兄弟作用域；父作用域不能访问子作用域。  示例在后边。
	可以使用 发出和广播 ，在各个作用域之间通讯。
	
	从作用域发出一个事件，使用$emit()方法。  语法： scope.$emit(name,[args,...])  name是事件名称，args是传递给事件处理函数的0个或多个参数  ---总结： 发出是从子传递到父
	
	广播，可以使用$broadcast()方法，把一个事件广播给下方的子作用域层次。任何已注册该事件的后代作用域，都会收到通知。语法： scope.$broadcast(name,[args,...])  ----总结：广播是从父传递给子
	
	处理发出或广播的事件，可以使用$on()方法。 语法： scope.$on(name,listener) name是要监听的事件名称，listener参数是一个函数，他可以接收事件作为第一个参数，并把由$emit或$broadcast()方法传递的任何参数作为后续的参数。
	
		其中，event对象具有以下属性：
		1. targetScope  $emit或$broadcast被调用时所在的作用域
		2. currentScope 当前正在处理该事件的作用域
		3. name 事件的名称
		4. stopPropagation() 停止在作用域层次结构中向上或向下传播事件的函数。
		5. preventDefault() 防止在浏览器的事件中的默认行为，而只执行自己的自定义的代码的函数。
		6. defaultPrevented: 布尔值，如果 event.preventDefault()被调用，则为true。
		
		示例在后边。
		
		

* 过滤器

	使用方法一：在html模板中使用
	{{ expression|filter}}
	{{ expression|filter1|filter2}}
	{{ expression|filter1:param1:param2... }}
	
	使用方法二：在控制器中使用，将“过滤器提供器”注入到控制器中使用，过滤器提供器=过滤器+“Filter”,比如过滤器是currency,那过滤器提供器就是currencyFilter
	controller('myCtrl',function($scope,currencyFilter)(
		$scope.getCurrencyValue=function(value){
			return currencyFilter(value,"$USD")
		}
	))
	
	使用方法三：$filter注入，  $filter(过滤器)(参数一)(参数二)...
        
  controller('name',function($scope,$filter){
    var num=$filter('number')(3000);   //num=3,000  $filter(过滤器名称)(参数1)(参数二)
    
    var jsonString=$filter('json')(myObj);  //jsonString 是非常便于查看的json字符串
  })
        	

* 常用过滤器

	* number
		不加参数,会为数字加上逗号 如:10000 10,000
		加参数number:3  保留3位小数
	* currency
		不加参数,会为数字加上$美元符号
		待参数,可以自定义货币符号 currency:'RMB'    100|currency:'RMB'   RMB100
	* date
		
		date 过滤器可以将日期格式化成需要的格式。AngularJS中内置了几种日期格式，如果没有指定使用任何格式，默认会采用 mediumDate 格式，下面的例子中展示了这个格式。
		带参数   如: date:'short' date:'y'
		        date:'yyyy-MM-dd hh:mm:ss'

		```
			·下面是内置的支持本地化的日期格式：
      　　{{ today | date:'medium' }} <!-- Aug 09, 2016 12:09:02 PM -->
      　　{{ today | date:'short' }} <!-- 11/11/1612:09PM -->
      　　{{ today | date:'fullDate' }} <!-- Thursday, August 09, 2016 -->
      　　{{ today | date:'longDate' }} <!-- August 09, 2016 -->
      　　{{ today | date:'mediumDate' }}<!-- Aug 09, 2016 -->
      　　{{ today | date:'shortDate' }} <!-- 8/9/16 -->
      　　{{ today | date:'mediumTime' }}<!-- 12:10:12 PM -->
      　　{{ today | date:'shortTime' }} <!-- 12:09 PM -->
      
      ·年份格式化
      　　四位年份：{{ today | date:'yyyy' }} <!-- 2016 -->
      　　两位年份：{{ today | date:'yy' }} <!-- 13 -->
      　　一位年份：{{ today | date:'y' }} <!-- 2016 -->
      
      ·月份格式化
      　　英文月份：{{ today | date:'MMMM' }} <!-- August -->
      　　英文月份简写：{{ today | date:'MMM' }} <!-- Aug -->
      　　数字月份：{{ today |date:'MM' }} <!-- 08 -->
      　　一年中的第几个月份：{{ today |date:'M' }} <!-- 8 -->
      
      
      ·日期格式化
      　　数字日期：{{ today|date:'dd' }} <!-- 09 -->
      　　一个月中的第几天：{{ today | date:'d' }} <!-- 9 -->
      　　英文星期：{{ today | date:'EEEE' }} <!-- Thursday -->
      　　英文星期简写：{{ today | date:'EEE' }} <!-- Thu -->
      
      
      ·小时格式化
      　　24小时制数字小时：{{today|date:'HH'}} <!--00-->
      　　一天中的第几个小时：{{today|date:'H'}} <!--0-->
      　　12小时制数字小时：{{today|date:'hh'}} <!--18-->
      　　上午或下午的第几个小时：{{today|date:'h'}} <!--18-->
      
      
      ·分钟格式化
      　　数字分钟数：{{ today | date:'mm' }} <!-- 08 -->
      　　一个小时中的第几分钟：{{ today | date:'m' }} <!-- 8 -->
      
      
      ·秒数格式化
      　　数字秒数：{{ today | date:'ss' }} <!-- 02 -->
      　　一分钟内的第几秒：{{ today | date:'s' }} <!-- 2 -->
      　　毫秒数：{{ today | date:'.sss' }} <!-- .995 -->
      
      
      ·字符格式化
      　　上下午标识：{{ today | date:'a' }} <!-- AM -->
      　　四位时区标识：{{ today | date:'Z' }} <!--- 0700 -->
      
      
      ·下面是一些自定义日期格式的示例：
      　　{{ today | date:'MMMd, y' }} <!-- Aug22, 2016 -->
      　　{{ today | date:'EEEE, d, M' }} <!-- Thursday, 9, 8-->
      　　{{ today | date:'hh:mm:ss.sss' }} <!-- 12:19:12.995 -->
    ```  
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
		
		
		
		示例参见: static/常用过滤器.html 常用过滤器2.html
		
		
		
* 自定义过滤器

	方法一：		
	$filterProvider.register(自定义过滤器名称,function(){   //这是底层方法,不常用
	
					return function(){}  //返回的必须是个函数
	});
	方法二：
	
	module.filter()  //便捷方式
	
	使用:  {{ expression|自定义过滤器名称 }}
	
	示例参见: static/自定义过滤器.html
		
*  指令  
		
	参考: http://www.runoob.com/angularjs/angularjs-reference.html	
	可以用指令来扩展html标签.
	angular有很多内置指令,也可以自定义指令.
	内置指令分类,渲染指令,事件指令,节点指令;也可以分为，支持angularjs功能的指令，扩展表单元素的指令，把作用域绑定到页面元素的指令，把网页事件绑定到控制器的指令。
	指令的名称,有多种不同的形式,(因为不同浏览器对html元素的校验规则不同),如: 
		ng-bind(无校验)  data-ng-bind(html5校验) ng:bind(xml校验) x-ng-bind(XHTML校验)
		
		

	
指令|描述
:---|:---
ng-app|定义应用程序的根元素。
ng-bind|绑定 HTML 元素到应用程序数据
ng-bind-html|绑定 HTML 元素的 innerHTML 到应用程序数据，并移除 HTML 字符串中危险字符
ng-bind-template|规定要使用模板替换的文本内容
ng-blur|规定 blur 事件的行为
ng-change|规定在内容改变时要执行的表达式
ng-checked|规定元素是否被选中
ng-class|指定 HTML 元素使用的 CSS 类
ng-class-even|类似 ng-class，但只在偶数行起作用
ng-class-odd|类似 ng-class，但只在奇数行起作用
ng-click|定义元素被点击时的行为
ng-cloak|在应用正要加载时防止其闪烁
ng-controller|定义应用的控制器对象
ng-copy|规定拷贝事件的行为
ng-csp|修改内容的安全策略
ng-cut|规定剪切事件的行为
ng-dblclick|规定双击事件的行为
ng-disabled|规定一个元素是否被禁用
ng-focus|规定聚焦事件的行为
ng-form|指定 HTML 表单继承控制器表单
ng-hide|隐藏或显示 HTML 元素
ng-href|为 the <a> 元素指定链接
ng-if|如果条件为 false 移除 HTML 元素
ng-include|在应用中包含 HTML 文件
ng-init|定义应用的初始化值
ng-jq|定义应用必须使用到的库，如：jQuery
ng-keydown|规定按下按键事件的行为
ng-keypress|规定按下按键事件的行为
ng-keyup|规定松开按键事件的行为
ng-list|将文本转换为列表 (数组)
ng-model|绑定 HTML 控制器的值到应用数据
ng-model-options|规定如何更新模型
ng-mousedown|规定按下鼠标按键时的行为
ng-mouseenter|规定鼠标指针穿过元素时的行为
ng-mouseleave|规定鼠标指针离开元素时的行为
ng-mousemove|规定鼠标指针在指定的元素中移动时的行为
ng-mouseover|规定鼠标指针位于元素上方时的行为
ng-mouseup|规定当在元素上松开鼠标按钮时的行为
ng-non-bindable|规定元素或子元素不能绑定数据
ng-open|指定元素的 open 属性
ng-options|在 <select> 列表中指定 <options>
ng-paste|规定粘贴事件的行为
ng-pluralize|根据本地化规则显示信息
ng-readonly|指定元素的 readonly 属性
ng-repeat|定义集合中每项数据的模板
ng-selected|指定元素的 selected 属性
ng-show|显示或隐藏 HTML 元素
ng-src|指定 <img> 元素的 src 属性
ng-srcset|指定 <img> 元素的 srcset 属性
ng-style|指定元素的 style 属性
ng-submit|规定 onsubmit 事件发生时执行的表达式
ng-switch|规定显示或隐藏子元素的条件
ng-transclude|规定填充的目标位置
ng-value|规定 input 元素的值

	
	
渲染指令: 将html代码中的ng指令,渲染成html标签/元素.
	常用: ng-init ng-bind ng-bind-template ng-repeat ng-include
			ng-init: 用于初始化一些变量值
			ng-repeat:  $index 当前索引  $first 是否为头元素 $middle 是否为非头非尾元素 $last 是否为尾元素
			ng-bind-template: 它的值可以是 文字 + 表达式,而ng-bind只能是表达式.
			ng-include: 可以包含其他html文件,另种写法 ng-include="'xxx.html'" 或者 ng-include src="'xxx.html'"
			
事件指令: 使用angular的事件指令代替html的事件指令,好处是,可以自动触发脏检查.
	常用: ng-change ng-click ng-dblclick ng-mousedown ng-mouseenter ng-mouseleave ng-mousemove ng-mouseover ng-mouseup ng-submit ng-blur ng-checked ng-copy ng-cut ng-focus ng-keydown ng-keypress ng-paste  如: ng-click="myClick($event)"
	
节点指令: 代替html元素属性的一些指令
	常用:ng-style ng-class ng-class-even ng-class-odd ng-show ng-hide ng-switch ng-src ng-href ng-if
	节点指令,通常情况下,比html自带的,多了一个逻辑判断,具体的实验在购物车实验中体现.
	如:
		ng-options="option.id as option.title for option in curOptionArray"
		 option.id是select提交的值 option.title是select显示的值 option代表数组curOptionArray里面的当前元素
	
例子： 将一个模块注入到另一个模块，并在另一个模块中，是用它的控制器	 			 
示例参见: static/在控制器和模块定义中实现依赖注入.html	

例子： 控制器、作用域和模板的关系
示例参见: static/基本的控制器和模板示例.html

例子： 控制器作用域的层次结构、父子、兄弟
示例参见: static/作用域层次结构.html

 例子：作用域层次结构中，$emit和$broadcast事件
 示例参见: static/作用域层次结构中的emit和broadcast事件.html

例子：表达式
示例参见: static/表达式.html

例子：使用过滤器实现排序和过滤
示例参见: static/排序和过滤.html

例子：自定义过滤器之敏感词过滤
示例参见: static/自定义过滤器之敏感词过滤.html

例子: 常用内置指令
示例参见: static/常用内置指令.html

	
* 自定义指令 directive
	
	自定义指令，通常用于操作dom的代码
	指令名称，使用驼峰式，在页面调用时，使用-或:等方式，如myDirective   --> my-directive
	
	创建方式： 使用 directive
	angular.module('myApp',[]).
	directive('myDirective',function(){  //定义指令名称，
		return {       //返回的是一个json
			xx:xx,
			template:'name:{{name}}'
		};
	
	})
	
	返回的json对象，可以有一下属性
	* template: 定义插入指令的元素的模板文本
	* templateUrl： 指定一个url，局部模板
	* restrict：  重要! 定义该指令在html中的形式，A 属性，E 元素，C 类名，M 注释
	* replace:  如果true，指令的模板会取代该自定义指令的元素
	* transclude: 允许你指定指令是否可以访问内部作用域以外的作用域，在template中，添加ng-transclude属性，使自定义指令的值来替换模板中的值
	* scope： 允许为指令指定内部作用域
	* link: 允许在拟定可以访问该作用域、dom元素和属性的链接函数
	* controller: 允许在指令中定义一个控制器来管理该指令的作用域和视图
	* require: 允许指定要实现这个指令所需要的其他指令，这些指令的提供器对于创建这个指令是可用的。
	
	
 定义指令视图模板----注：模板中只能有一个根元素
    template
    templateUrl
 限制指令行为----自定义指令在html中的形式
  A E C M      
 更换模板元素----如果true,编译器会把自定义指令替换为模板中的元素
    replace:true 
 转置外部作用域
    使用transclude配合ng-transclude来替换元素内容   
 配置指令作用域 ----不太懂教程里对该部分的描述，待试验后在整理
    有时，需要把一个指令里面的作用域与该指令外面的作用域分离，可以防止该指令在本地控制器改变值的可能性。
    指令定义允许指定一个创建隔离作用域的作用域。
    将外部作用域的一些项目，映射到指令的作用域内，可以使用下面的前缀属性名
      @ 把一个局部作用域内的字符串绑定到dom属性值中。该属性的值将在指令作用域内可用---单向绑定，父影响子，子不影响父
      = 在局部作用域和指令作用域属性之间创建一个双向的绑定
      & 把在局部作用域内的函数绑定到指令作用域----将内部scope的函数的返回值，和外部的scope的任何属性绑定起来
 操纵dom的链接功能
    angularjs的html编译器，遇到一个指令时，会允许该指令的编译函数，这返回link()函数。link()函数被添加到angularjs指令列表，一旦所有的指令都被编译完成，则html编译器，根据优先级顺序，调用link()函数.
    link:function(scope,element,attributes,[controller]){} 
    scope参数是指令的作用域，element是指令将被插入的元素，attribute列出该元素中定义的属性，而controller是由require选项指定的控制器。     
    如：
    directive('myDirective',function(){
      return {
        scope:{title:'='},
        require:'^otherController',  // ^指的是向上级元素找
        link:function(scope,elem,attr,otherController){
          scope.title="new";
          elem.append('linked');
          elem.on('$destroy',function(){
            //清理代码
          });
          scope.$watch('title',function(newVal){
            //监视代码
          })
        }
      }
    }) 
 添加一个控制器到指令
    可以利用指令的controller属性，为指令添加自定义控制器。这使你可以为指令模板提供控制器支持。
    如：
      directive('myDirective',function(){
        return {
          scope:{title:'='},
          controller:function($scope){
            $scope.title='new',
            $scope.myFun=function(){}
          }
        }
      })	
      
	
 例子： 自定义指令试验
 示例参见: static/自定义指令试验.html		static/自定义指令试验子页面.html
				
* 购物车试验

	1. 通过ng-repeat遍历
	2. 模糊搜索-------扩展,搜索框默认搜索范围为所有属性,搜索框后边添加个下拉框,可以限定需要搜索的属性
	3. 排序-----在每列的表头添加三角形图片,点击即可排序,正序倒序
	4. 总金额/总数量计算
	5. 商品移除
	6. 商品数量增加减少
	7. 清空购物车--显示相应信息
	8. 过滤器 金额添加rmb字符,数量添加逗号等待
		
		
		
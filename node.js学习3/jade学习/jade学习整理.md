jade学习整理
---

通过慕课网教程学习 http://www.imooc.com/learn/259

安装好jade/pug之后，可以找到jade.cmd/pug.cmd （可能需要安装pug-cli）
该命令可以将jade/pug格式的文档，编译成相应的格式，比如html，xml等

* 基本语法
	* 缩进2个空格
	* doctype 定义文档类型，比如html/xml等等，也支持html老版本的格式
	* 不需要尖括号，直接写元素名称，比如html head body等，与内容直接用空格分割
	* 元素的属性
		* class使用. id使用#
		* 元素名后边用()，如a(href='www.baidu.com',title='test')
		
	* 成段的文本，全都放到一行会是代码可读性差，两种方法解决(参考示例理解)
		* 使用 | 加文本内容 表示这些是一段
		* 使用. 表示下面的是一段
			```
			p
				| 1.起因
				| 2.经过
				| 3.结果
				
			p.
				1.起因
				2.经过
				3.结果
				
			```
		* 可以在jade代码中直接使用html格式的代码
			```
			p
				| 你好奥卡福发大水开放时间<strong>阿卡丽</strong>
			
			```
	* 注释
		* 单行注释、非缓冲注释、块注释
			```
			// h3 单行注释  --编译到html里
			//- 非缓冲注释  --不会编译到html里
			//-           --块注释，也不会编译
			  p.
			    1.起因
			    2.经过
			   
			```
	
	* 在页面上声明变量
		```
		语法:
		- var name="malei"
		
		```
	* 使用变量 
		```
	  语法:
			1. #{变量名}
			2. =变量名 等价于#{}  `注意：=之前没有空格`
			3. !{变量名}  如果变量里有特殊字符，使用这种方式不会被转义，比如<script> 不会被转义成&lt;script&gt;
			4. !=变量名 等价于 !{变量名}
			
			对于#!如果不想被编译，使用\# \!即可

		```
	* 数据传递(从后台传值)	
		
		注意：页面声明的变量优先级高，当变量同名时，使用的是页面上的
		
	* 流程代码
		* 循环 for each while  
		```
		- var datas={name:'node',level:'high'}
		- for (var k in datas)
		  p=datas[k]
		  
		each value,key in datas  //注意each没有-
		  p #{key}: #{value}  
		  
		 - var n=0
		 while n<4   //也没有-
		  li=n++
		
		```
		* 条件判断 (if else) ( unless else) (case when default)
		
			注: unless 条件为假 它下边的才会执行 与if相反
			
* 神奇的mixin	(代码重用/复用，内联代码块 )
			
	语法:
	```
	//先定义
	mixin 名称1  //不带参数
		操作	
	
	mixin 名称2(参数1，参数2)  //带参数
	  操作		
		
	//使用
	+名称1
	+名称2(参数1，参数2)	
	
	//代码嵌套
	mixin 名称3
		操作
		+名称1
		操作
		+名称2(参数，参数)
		
	//内联代码块
	在使用mixin时，如果它下面有代码，会被它解析成block变量
	如:
		定义
		mixin 名称4
			p hello
			if block  //这里的block，是调用名称4时，它下面的代码
				block	
		使用
		+名称4
			p 我是名称4下面的代码，我被名称4解释为block 
		
	//改属性		方法1	需要每个属性都设置一下
	//attributes是属性对象
	如:
		定义
		mixin 名称5(参数)  //这里的参数不是属性哦！
			p(class!=attributes.class) #{参数}
			
		使用
		+名称5(参数)(属性=值)
		+名称5(参数)(class='col-sm-4')
											
		attributes.class的值是col-sm-4，注意mixin中的!=防止转义
	//改属性 方法2  可以整体的属性设置
	//使用&attributes()
	如:
		定义
		mixin 名称6(参数)
			p&attributes(attributes) #{name}
		使用
		+名称6（参数）(属性=值)	
		
	//参数个数不确定时	 参数使用 ...参数名 三个点加参数名 然后 遍历这个参数名
	如:
		mixin show(...lessons)
			ul
				each lesson in lessons
					li #{lesson}
	
	
	```
	示例参见 mixin试验.pug
	
	注:mixin之间可以嵌套
	
* 模板继承	
		
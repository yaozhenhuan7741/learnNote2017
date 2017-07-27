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
		* for each while if else
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
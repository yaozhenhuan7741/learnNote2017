## html条件注释

* 经常用于判断浏览器版本 比如是否是ie，是否是ie6等等

* 语法 使用<!--[if xx]>  code  <![endif]--> 

* 常用语法
  
  ```
  示例:
  <!--[if IE]>
  <script src='xxx'></script>
  <![endif]-->
  ```
  ```
  IF IE  支持所有ie
  IF !IE 支持非ie
  IF IE 6
  IF IE 7
  IF IE 8
  IF IE 9
  IF IE 10
  IF LTE 9
  IF GT 8
  
  lt 小于
  gt 大于
  lte 小于等于
  gte 大于等于
  
  if (IE 6)(IE 7)(IE 8) 匹配多个
  
  ```
   
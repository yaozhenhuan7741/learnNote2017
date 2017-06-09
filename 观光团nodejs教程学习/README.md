#观光团nodejs教程学习

##使用nodejs+express+mongodb搭建blog

重在学习的过程，里面的一些步骤，是为之后的改进打基础

###第一步 安装全局库

```
npm install -g express express-generator
```

###第二步 创建工程
```
express -e blog  #使用ejs
cd blog
npm install
```

注:更换npm源为淘宝源
```
npm config set registry http://registry.npm.taobao.org/

```

启动工程
```
npm start
```

###第三步 开始

1. 修改引擎
app.js 中
```
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);
```
然后 views目录下的文件，以后扩展名，都用html

2. 修改路由
将app.js 中自带的路由注释掉，然后添加自己的路由----这样可以加深对路由的理解，以后可以直接用自带的
增加config/routes.js 
修改views下的模板，增加 注册/登录/首页三个页面
 
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

3. 注册功能
添加express-session connect-mongo mongoose 三个模块
npm install express-session
npm install connect-mongo
npm install mongoose

修改app.js，增加mongo相关和session相关
增加user模型
完成注册功能
注：session保存调用与视频中不通，参考的connect-mongo官网信息

4. 登陆功能
完成登录功能，主要用到mongoose的查询

5. 重新设计用户模型
用户唯一性---重新设计用户模型，修改用户名的唯一性，修改完成后，需要清空mongodb之前建的用户信息
增加注册用户时，检查是否已存在该用户名

6. 使用session保存登录状态
修改首页，根据登录状态，显示不同导航栏菜单
增加session保存登录状态
使用 app.locals.xxx 
登录成功后，跳转的个人信息页面
增加个人信息路由和页面---待完善

7. 完善个人信息页面

url中  /user/:_id 匹配
获取url中的参数 教程中使用req.param('_id')，官网推荐使用req.params对象来访问，如req.params._id
另外，教程中，个人信息页面，使用的是user._id 而 user实际是app.locals.user 即为 session中的，不是刚刚查询到的

8. 发表微博页面

增加微博页面和路由
增加微博模型
发布微博后，跳转到微博页面

9. 微博列表

增加微博列表页面和路由
微博列表排序

10. 关联文档

微博模型中添加作者字段，关联user表
```
var blogSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:String,  //微博标题
    content:String  //微博内容
});

```
```
ModelBlog.find({},null,{sort:{'_id':-1}}).populate('author').exec(function (err,data) {
            if(err) console.log(err);
                        // res.send(data);
            res.render('list',{title:'微博列表',blogs:data});
        })
```
    
11. 业务模块分离
    
    将route.js中的处理函数，提取到单独的文件中，使业务和处理逻辑分离（mvc思想）
    
12. 用户访问权限
    （防止直接访问url）;
    用户登录后，才能访问的页面；
    用户登录后，不能访问的页面；
    
    
    
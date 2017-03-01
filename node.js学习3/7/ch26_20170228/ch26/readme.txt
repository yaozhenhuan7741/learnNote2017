20170228 23:00 还差用户修改、用户删除相关 userinfo 页面和相应的updateuser deleteuser
models 存放模型，比如用户模型
controllers 存放控制器，比如用户的控制器，支持对用户的增删改查
libs      存放通用的一些工具类，比如密码加密等


页面规划：
index.html 用户首页  显示 注销按钮  修改用户
login.html 登录页面
signup.html  注册页面
userinfo.html  用户信息页面

路由规划：
    get /  如果有session,则跳转到index页面，如果没有，跳转到login页面
    get /login  如果有session,直接重定向到/，如果没有，跳转到login页面
    get /logout 删除session，并且重定向到 /login
    get /user  如果有session,跳转到userinfo.html,如果没有 重定向/login
    get /signup 如果有session，重定向到/,如果没有，跳转到 signup.html
    get /user/profile  返回用户信息

    post /doSignup  使用doSignup函数处理，向users表保存用户信息
    post /user/update  使用updateUser函数来更新用户信息
    post /user/delete  使用deleteUser函数来删除用户
    post /doLogin        使用doLogin函数来查询用户信息，查到后跳转到/


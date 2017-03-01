/**
 * Created by malei on 2017/2/28.
 */
//用户处理控制器----在用户模型的基础上，对用户的增删改查
//引入工具类
var myUtils=require('../libs/myUtils');
//引入mongoose类以及user模型
var mongoose=require('mongoose');
var User=mongoose.model('User');
//创建user模型时，已经使用mongoose.model('User',userSchema)编译了模型，这里可以直接引用

//用户注册--向用户表中插入数据
exports.doSignup=function (req,res) {
    //两个参数分别对应请求和响应
    //创建一个新用户
    var user=new User({username:req.body.username});
    user.set('hashed_password',myUtils.hashPW(req.body.password));
    user.set('email',req.body.email);
    user.save(function (err) {
        console.log(req.session);
        if(err){
            req.session.msg='注册失败，请重试！';
            res.redirect('/signup');
        }else{
            req.session.user=user.id; //将数据库中的主键作为user的主键
            req.session.username=user.username;
            req.session.msg='恭喜你'+user.username+' 注册成功!';
            res.redirect('/');
        }
    })
};

//用户登录--查询用户表中是否有该用户，如果有，跳转到首页，如果没有，重新登录
exports.doLogin=function (req,res) {
    User.findOne({username:req.body.username})
        .exec(function (err,user) {
            console.log(user);
            if(!user){
                err='用户不存在!';
            }else if(user.hashed_password===
                myUtils.hashPW(req.body.password.toString())){
                req.session.regenerate(function () {
                    req.session.user=user.id;
                    req.session.username=user.username;
                    req.session.msg="欢迎你"+user.username+'!';
                    res.redirect('/');
                });
            }else{
                err='认证失败！';
            };
            if(err){
                req.session.regenerate(function () {
                    req.session.msg=err;
                    console.log(req.session);
                    res.redirect('/login');
                });
            }
        });
};

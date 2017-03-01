/**
 * Created by Administrator on 2017/2/6.
 *
 */
//用户控制功能，包括用户的增删改查，并写入到mongodb中

var crypto=require('crypto');
var mongoose=require('mongoose');
var User=mongoose.model('User');
function hashPW(passwd) {
    return crypto.createHash('sha256').update(passwd).digest('base64').toString();
}


//用户注册路由
exports.signup=function (req,res) {
    var user=new User({username:req.body.username});
    user.set('hashed_password',hashPW(req.body.password));
    user.set('email',req.body.email);
    user.save(function (err) {
        if(err){
            res.session.error=err;
            res.redirect('/signup');
        }else{
            req.session.user=user.id;
            req.session.username=user.username;
            req.session.msg='恭喜你，'+user.username+' 注册成功！';
            res.redirect('/');
        }
    });
};

exports.login=function (req,res) {
    User.findOne({username:req.body.username}).exec(function (err,user) {
        if(!user){
            err='用户不存在！';
        }else if(user.hashed_password===hashPW(req.body.password.toString())){
            req.session.user=user.id;
            req.session.username=user.username;
            req.session.msg="登录成功！";
            res.redirect('/');
        }else {
            err="密码错误！";
        }

        if(err){
            req.session.regenerate(function () {
                req.session.msg=err;
                res.redirect('/login');

            });
        }
    });
};

exports.getUserProfile=function (req,res) {
    User.findOne({_id:req.session.user}).exec(function (err,user) {
        if(!user){
            res.json(404,{err:"没有找到该用户！"})
        }else {
            res.json(user);
        }
    });
};

exports.updateUser=function (req,res) {
    User.findOne({_id:req.session.user}).exec(function (err,user) {
        user.set('email',req.body.email);
        user.set('color',req.body.color);
        user.save(function (err) {
            if(err){
                res.session.error=err;
            }else{
                req.session.msg='用户修改成功！';
            }
            res.redirect('/user');
        })
    });
};
exports.deleteUser=function (req,res) {
    User.findOne({_id:req.session.user}).exec(function (err,user) {
        if(user){
            user.remove(function (err) {
                if(err){
                    req.session.msg=err;
                }
                req.session.destroy(function () {
                    res.redirect('/login');
                });
            });
        }else{
            req.session.msg="没找到此用户！";
            req.session.destroy(function () {
                res.redirect('/login');
            });
        }
    });
};


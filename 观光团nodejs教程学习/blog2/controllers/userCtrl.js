/**
 * Created by malei on 2017/6/13.
 */
//引入用户模型
var UserModel=require('../models/user');

//用户注册
module.exports.reg={
    get:function (req,res) {
        //res.send('注册成功ff')
        res.render('reg',{title:'用户注册'});
    },
    post:function (req,res) {
        var postData={
            username:req.body.username,
            password:req.body.password
        };
        //console.log(postData);
        var resJson={
            status:false,
            msg:''
        };
        UserModel.findOne({
            username:postData.username
        },function (err,data) {
            if(err) console.log(err);
            if (data) {
                resJson.msg = '用户名已存在';
                res.send(resJson);
            } else {
                UserModel.create(postData, function (err, data) {
                    if (err) {
                        resJson.msg = "注册失败";
                        resJson.err = err;
                        res.send(resJson);
                    } else {
                        req.session.user=data;
                        resJson.status = true;
                        resJson.msg = '注册成功';
                        res.send(resJson);
                    }
                });
                //res.send('注册成功');
            }
        });
    }
};

//用户登录
module.exports.login={
    get:function (req,res) {
        //res.send('登录页面');
        res.render('login',{title:'用户登录'});
    },
    post:function (req,res) {
        var postData={
            username:req.body.username,
            password:req.body.password
        };

        var resJson={
            status:false,
            msg:''
        };

        UserModel.findOne({
            username:postData.username
        },function (err,data) {
           if(err){
               resJson.msg='登录失败';
               res.send(resJson);
           };
           if(data){
               if(data.password==postData.password){
                   req.session.user=data;
                   resJson.status=true;
                   resJson.msg='登录成功';
                   res.send(resJson);
               }else{
                   resJson.msg='密码错误';
                   res.send(resJson);
               }

           }else{
               resJson.msg='没有此用户';
               res.send(resJson);
           }

        });
        // res.send('登录成功')
    }
};

module.exports.logout={
    get:function (req,res) {
         delete req.session.user;
         res.redirect('/login');
    }
};
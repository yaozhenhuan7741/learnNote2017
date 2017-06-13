/**
 * Created by malei on 2017/6/13.
 */
//引入用户模型
var UserModel=require('../models/user');

//用户注册
module.exports.reg={
    get:function (req,res,next) {
        //res.send('注册成功ff')
        res.render('reg',{title:'用户注册'});
    },
    post:function (req,res,next) {
        var postData={
            username:req.body.username,
            password:req.body.password
        };
        //console.log(postData);
        var resJson={
            status:false,
            msg:''
        };
        UserModel.create(postData,function (err,data) {
            if(err) {
                resJson.msg="注册失败";
                resJson.err=err;
                res.send(resJson);
            }
            resJson.status=true;
            resJson.msg='注册成功';
            res.send(resJson);
        });
        //res.send('注册成功');

    }
};
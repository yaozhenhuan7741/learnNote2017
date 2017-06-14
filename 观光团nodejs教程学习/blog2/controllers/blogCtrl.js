/**
 * Created by malei on 2017/6/13.
 */

//引入博客模型
var BlobModel = require('../models/blog');

//发表微博
module.exports.add = {
    get: function (req, res) {
        //res.send('发表微博')
        res.render('add', {title: '发表微博'});
    },
    post: function (req, res) {
        var postData = {
            author: req.body.author,
            title: req.body.title,
            content: req.body.content
        };
        var resJson = {
            status: false,
            msg: ''
        };
        BlobModel.create(postData, function (err, data) {
            if (err) {
                resJson.msg = '发表失败';
                resJson.err = err;
                res.send(resJson);
            }
            if (data) {
                resJson.status = true;
                resJson.msg = '发表成功';
                resJson.blog = data;
                res.send(resJson);
            } else {
                resJson.msg = '发表失败';
                res.send(resJson);
            }
        });
    }
};

//查看微博和修改微博
module.exports.view = {
    get: function (req, res) {
        var _id = req.params._id;
        // BlobModel.findById(_id, function (err, data) {
        //     if (err) console.log(err);
        //     res.render('view', {title: '查看微博', blog: data});
        // });

        BlobModel.findById(_id).populate('author').exec(function (err,data) {
            if (err) console.log(err);
            res.render('view', {title: '查看微博', blog: data});
        });
        //res.send('查看微博')

    },
    post: function (req, res) {
        var resJson={
            status:false,
            msg:''
        };
       BlobModel.update({_id:req.params._id},{$set:{
           title:req.body.title,
           content:req.body.content,
           time:Date.now()
       }},function (err) {
            if(err){
                resJson.msg='修改失败';
                res.send(resJson);
            }else{
                resJson.status=true;
                resJson.msg='修改成功';
                res.send(resJson);
            }
       });
    }
};



//微博列表
module.exports.list = {
    get: function (req, res) {
        res.send('微博列表')
        //res.render('reg', {title: '用户注册'});
    },
    post: function (req, res) {

    }
};


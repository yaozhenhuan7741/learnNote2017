/**
 * Created by malei on 2017/6/12.
 */
var ModelBlog = require('../model/blog');

module.exports.add={
    get:function (req, res, next) {
        res.render('add', {title: '发表微博'});
    },
    post:function (req, res, next) {
        var postData = {
            author:req.session.user._id,
            title: req.body.title,
            content: req.body.content
        };
        var resJson={
            status:false,
            msg:''
        };
        ModelBlog.create(postData, function (err, data) {
            if (err) {
                console.log(err);
                resJson.msg='发表失败';
                res.send(resJson);
            }
            resJson.status=true;
            resJson.msg='发表成功';
            resJson.data=data;
            res.send(resJson);
            //res.redirect('/view/' + data._id);
            //res.send(data);
        });

        //res.send(postData);
    }
};

module.exports.list={
    get:function (req, res, next) {
        // ModelBlog.find({},function (err,data) {
        //     if(err) console.log(err);
        //     res.render('list',{title:'微博列表',blogs:data});
        // }); //不排序

        // ModelBlog.find({}).sort({'_id': -1}).exec(function (err, data) {
        //     if (err) console.log(err);
        //     res.render('list', {title: '微博列表', blogs: data});
        // }); //排序


        ModelBlog.find({author:req.session.user._id},null,{sort:{'_id':-1}}).populate('author').exec(function (err,data) {
            if(err) console.log(err);
            //console.log(data);
            // res.send(data);
            res.render('list',{title:'微博列表',blogs:data});
        })

    }
};

module.exports.view={
    get:function (req, res, next) {
        var getData = {
            _id: req.params._id
        };
        ModelBlog.findOne(getData, function (err, data) {
            if (err) console.log(err);
            if (data) {
                res.render('view', {title: data.title, view: data});
            } else {
                res.send('此微博，不存在');
            }
        });

    }
};

module.exports.edit={
    get:function (req,res,next) {
        var _id=req.params._id;
        ModelBlog.findById(_id,function (err,data) {
            if(err)console.log(err);
            //res.send(data);
            res.render('edit',{title:'修改微博',view:data});
        });
        //res.send('修改微博');
    },
    post:function (req,res,next) {
        console.log(req.body);
        var resJson={
            status:false,
            msg:''
        };
        ModelBlog.update({_id:req.body._id},{$set:{title:req.body.title,content:req.body.content}},function (err) {
            if(err){
                resJson.msg='修改失败';
                res.send(resJson);
            }
            resJson.status=true;
            resJson.msg='修改成功';
            res.send(resJson);
        });
        //res.send('修改成功');
    }
}
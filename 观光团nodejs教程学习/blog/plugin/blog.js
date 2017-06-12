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

        ModelBlog.create(postData, function (err, data) {
            if (err) console.log(err);
            res.redirect('/view/' + data._id);
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
}
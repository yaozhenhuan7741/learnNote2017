/**
 * Created by malei on 2017/6/7.
 */
//自定义路由
module.exports=function (app) {
    app.get('/',function(req,res,next){
        // res.send('这是首页！');
        res.render('index',{title:'首页'});
    });
    app.get('/login',function(req,res,next){
        //res.send('登录');
        res.render('login',{title:'登录'})
    });
    app.get('/reg',function(req,res,next){
        //res.send('注册');
        res.render('reg',{title:'注册'})
    });
     app.get('/logout',function(req,res,next){
            //res.send('退出');
            res.redirect('/');
        });

};
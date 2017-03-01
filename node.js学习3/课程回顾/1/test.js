/**
 * Created by Administrator on 2017/2/13.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var setting=require('./settings');
require('./models/db_model');
var myUtils=require('./myUtils');
var User =mongoose.model('t_user');
var Depart=mongoose.model('t_depart');


mongoose.connect("mongodb://"+setting.host+":"+setting.port+"/"+setting.db);

User.findOne({username:'malei'}).exec(function (err,user) {
    console.log(user);
    //console.log(err);
});

var user = new User({userno:'0',username:'malei'});
user.set('password', myUtils.hashPW('123123'));
user.set('departno', '-1');
user.save(function(err) {
    if (err){
        //console.log(err)
    } else {
        console.log('success');
    }
    mongoose.disconnect();
});
/**
 * Created by Administrator on 2017/2/6.
 */
//用户模型
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:{type:String,unique:true},
    email:String,
    color:String,
    hashed_password:String
});
mongoose.model('User',UserSchema);
/**
 * Created by Administrator on 2017/2/10.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:{type :String,unique:true},
    hashed_password:String,
    email:String,
    color:String
});
mongoose.model('User',UserSchema);

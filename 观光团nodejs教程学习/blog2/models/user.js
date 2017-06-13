/**
 * Created by malei on 2017/6/13.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    password:String
});

module.exports=mongoose.model('user',UserSchema);
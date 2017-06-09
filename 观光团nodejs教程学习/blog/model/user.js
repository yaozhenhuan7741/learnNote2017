/**
 * Created by malei on 2017/6/9.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    password:String
});

module.exports=mongoose.model('user',userSchema);
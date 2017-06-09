/**
 * Created by malei on 2017/6/9.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var blogSchema=new Schema({
    title:String,  //微博标题
    content:String  //微博内容
});

module.exports=mongoose.model('blog',blogSchema);
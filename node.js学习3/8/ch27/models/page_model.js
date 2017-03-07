/**
 * Created by malei on 2017/3/7.
 * 定义评论页面模型
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PageSchema=new Schema({
    name:{type:String,unique:true},  //页面名字
    commentId:Schema.ObjectId
});
mongoose.model('Page',PageSchema);
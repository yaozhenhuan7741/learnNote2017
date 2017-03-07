/**
 * 定义评论对象,支持评论在内部嵌套
 * Created by malei on 2017/3/7.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ReplySchema=new Schema({
    username:String,
    subject:String,
    timestamp:{type:Date,default:Date.now},
    body:String,
    replies:[]     //教程中是replies[ReplySchema] 自我嵌套，但是会报错，暂时设置为空
},{_id:true});

var CommentThreadSchema=new Schema({
    title:String,
    replies:[ReplySchema]
});


mongoose.model('Reply',ReplySchema);
mongoose.model('CommentThread',CommentThreadSchema);

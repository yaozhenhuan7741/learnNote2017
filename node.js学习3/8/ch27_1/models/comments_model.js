/**
 * Created by Administrator on 2017/3/13.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//评论内容模型
var ReplySchema=new Schema({
    username:String,  //评论人
    subject:String,   //评论主题
    body:String,      //评论内容
    timestamp:{type:Date,default:Date.now},  //评论时间
    replies:[]                               //子评论
});

//根评论模型
var CommentsSchema=new Schema({
    title:String,
    replies:[ReplySchema]
});

mongoose.model('Reply',ReplySchema);
mongoose.model('CommentRoot',CommentsSchema);
/**
 * Created by Administrator on 2017/3/13.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PhotoSchema=new Schema({
    title:String,
    filename:String,
    timestamp:{type:Date,default:Date.now},
    commentId:Schema.ObjectId
});
mongoose.model('Photo',PhotoSchema);

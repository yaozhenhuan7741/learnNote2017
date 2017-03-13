/**
 * Created by Administrator on 2017/3/13.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PageSchema=new Schema({
    name:{type:String,unique:true},
    commentId:Schema.ObjectId
});
mongoose.model('Page',PageSchema);
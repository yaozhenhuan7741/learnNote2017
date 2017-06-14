/**
 * Created by malei on 2017/6/13.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BlogSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:String,
    content:String,
    time:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('blog',BlogSchema);
/**
 * Created by malei on 2017/3/7.
 */
var mongoose=require('mongoose');
var CommentThread=mongoose.model('CommentThread');
var Reply=mongoose.model('Reply');
exports.getComment=function (req,res) {
    CommentThread.findOne({_id:req.query.commentId})
        .exec(function (err,comment) {
            if(!comment){
                res.json(404,{msg:'CommentThread not found '})
            }else {
                res.json(comment)
            }
        })
};
exports.addComment=function (req,res) {
    CommentThread.findOne({_id:req.body.rootCommentId})
        .exec(function (err,commentThread) {
            if(!commentThread){
                res.json(404,{msg:'CommentThread not found'})
            }else {
                var newComment=Reply(req.body.newComment);
                newComment.username=generateRandomUsername();
                //console.log(newComment);
                addComment(req,res,commentThread,commentThread,req.body.parentCommentId,newComment);
            }
        })
};

function addComment(req,res,commentThread,currentComment,parentId,newComment) {
    if(commentThread.id==parentId){
        console.log('11');
        commentThread.replies.push(newComment);
        //console.log(commentThread);
        updateCommentThread(req,res,commentThread);
    }else {
        console.log('22');
        for (var i=0;i<currentComment.replies.length;i++){
            var c=currentComment.replies[i];
            if(c._id==parentId){
                c.replies.push(newComment);
                var replyThread=commentThread.replies.toObject();
                updateCommentThread(req,res,commentThread);
                break;
            }else {
                addComment(req,res,commentThread,c,parentId,newComment);
            }

        }
    }
};

function updateCommentThread(req,res,commentThread) {
    CommentThread.update({_id:commentThread.id},{$set:{replies:commentThread.replies}})
        .exec(function (err,savedComment) {
            console.log(savedComment);
            if(err){
                console.log(err);
                res.json(404,{msg:'Failed to update commentThread '})
            }else{
                res.json({msg:'success'});
            }
        });
};
function  generateRandomUsername() {
    var users=['malei','wangxinghua','madingyan','xiaoming','xiaoliang','xiaohong'];
    return users[Math.floor((Math.random()*5))];
}
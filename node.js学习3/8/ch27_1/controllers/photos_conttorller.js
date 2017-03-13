/**
 * Created by Administrator on 2017/3/13.
 */
var mongoose=require('mongoose');
var Photo=mongoose.model('Photo');
var msg='';
exports.getPhotosList=function (req,res) {
    Photo.find().exec(function (err,photosList) {
        if(!photosList){
            msg='图片列表获取失败！';
            res.json(404,{msg:msg});
        }else {
            msg='图片列表获取成功！';
            res.json(photosList);
        }
        console.log(msg)
    });
}
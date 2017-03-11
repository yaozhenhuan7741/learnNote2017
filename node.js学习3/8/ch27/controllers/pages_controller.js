/**
 * Created by malei on 2017/3/7.
 */
var mongoose=require('mongoose');
var Page=mongoose.model('Page');

exports.getPage=function (req,res) {
    Page.findOne({name:req.query.pageName})
        .exec(function (err,page) {
            console.log(page);
            if(!page){
                res.json(404,{msg:'Page Not Found '});
            }else{
                res.json(page);
            }
        })
};
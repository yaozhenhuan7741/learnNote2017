/**
 * Created by Administrator on 2017/2/13.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
        userno:{type:String,unique:true},  //用户编号
        username:String,   //用户名
        departno:String,   //用户所属机构
        sex:String,        //用户性别
        password:String,   //加密后的密码
        roles:String,      //用户角色
        status:String,     //用户状态
        creater:String,    //创建人
        createtime:String, //创建时间
        lastmodifyuser:String, //最后的修改人
        lastmodifytime:String //最后的修改时间
    }
);

var departSchema=new Schema({
        departno:{type:String,unique:true}, //机构号
        departname:String,                  //机构名称
        departstatus:String,                //机构状态
        parentdepartno:String,              //父结构名称
        childdepart:Array        //子机构
});

//编译模型，以后可以用mongoose。model('t_user')直接调用编译好的模型。
mongoose.model('t_user',userSchema)
mongoose.model('t_depart',departSchema)

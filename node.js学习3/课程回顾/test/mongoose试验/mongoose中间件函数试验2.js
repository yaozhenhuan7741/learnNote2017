/**
 * Created by malei on 2017/6/29.
 */
var mongoose=require('mongoose');
//mongoose@4.7及之前版本可以正常运行
mongoose.Promise=global.Promise;
var Schema=new mongoose.Schema({
    name:String,
    age:Number
});
var Model=mongoose.model('persion',Schema,'persion');

Model.schema.pre('save',function (next) {
    console.log('%s 将被保存',this.name);
    next();
});

mongoose.connect('mongodb://localhost/test');
mongoose.connection.once('open',function () {

    var newPersion=new Model({
        name:'malei',
        age:29
    });
    newPersion.save(function (err) {
        console.log(err);
        Model.findOne({name:'malei'},function (err,doc) {
            console.log(doc);
            mongoose.disconnect();
        })

    });

})
/**
 * Created by Administrator on 2017/2/3.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var db=mongoose.connect('mongodb://localhost/words');
var wordSchema=require('./word_schema').wordSchema;
var Words=mongoose.model('Words',wordSchema);

mongoose.connection.once('open',function () {
    var query=Words.findOne().where('word','book');
    query.exec(function (err,doc) {
        console.log("Is document New? "+doc.isNew);
        console.log('\nBefore Save: ');
        console.log(doc.toJSON());
        //修改查询到的数据
        doc.set('word','Book');
        doc.set('first','B');
        doc.set('charsets',[]);
        console.log("\nModified Filelds: ");
        console.log(doc.modifiedPaths());
        doc.save(function (err) {
            console.log('err: '+err);
            //重新查询
            Words.findOne({word:'Book'},function (err,doc) {
                console.log('\nAfter Save: ');
                console.log(doc);
                mongoose.disconnect();
            });
        });
    });

});
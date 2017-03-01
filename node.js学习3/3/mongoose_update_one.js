/**
 * Created by Administrator on 2017/2/3.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var db=mongoose.connect('mongodb://localhost/words');
var wordSchema=require('./word_schema').wordSchema;
var Words=mongoose.model('Words',wordSchema);

mongoose.connection.once('open',function () {
    var query=Words.findOne().where('word','gratifaction');
    query.exec(function (err,doc) {
        console.log('Before Update: ');
        console.log(doc.toString());
        var query=doc.update({$set:{word:'gratifactions',size:13,last:'s'},$push:{letters:'s'}});
        query.exec(function (err,results) {
            console.log('\n%d Documents updated',results);
            Words.findOne({word:'gratifactions'},function (err,doc) {
                console.log('after update: ');
                console.log(doc.toString());
                mongoose.disconnect();
            });
        });
    });
});
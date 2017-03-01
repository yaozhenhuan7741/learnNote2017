/**
 * Created by Administrator on 2017/2/3.
 * db.word_stats.insert({"word" : "happy", "first" : "h", "last" : "y", "size" : 5, "letters" : [ "h", "a", "p", "y" ], "stats" : { "vowels" : 1, "consonants": 4 }, "charsets" : [ { "type" : "consonants", "chars" : [ "h", "p", "y" ] }, { "type" : "vowels", "chars" : [ "a" ] } ] });
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var db=mongoose.connect('mongodb://localhost/words');
var wordSchema=require('./word_schema').wordSchema;
var Words=mongoose.model('Words',wordSchema);

mongoose.connection.once('open',function () {
    var query=Words.findOne().where('word','happy');
    query.exec(function (err,doc) {
        console.log('Before delete: ');
        console.log(doc.toString());
        //删除
        doc.remove(function (err,deleteDoc) {
            //重新查询
            Words.findOne({word:'happy'},function (err,doc) {
                console.log('\nAfter delete: ');
                console.log(doc);
                mongoose.disconnect();
            });
        });
    });
});
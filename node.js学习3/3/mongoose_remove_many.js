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
    Words.find({word:/grat.*/},function (err,docs) {
        console.log("Before delete: ");
        for(var i in docs){
            console.log(docs[i].word);
        };
        var query=Words.remove();
        query.where('word').regex(/grat.*/);
        query.exec(function (err,results) {
            console.log("\n%d Document Deleted.",results);
            Words.find({word:/grat.*/},function (err,docs) {
                console.log("After delete: ");
                for(var i in docs){
                    console.log(docs[i]);
                    mongoose.disconnect();
                };
            });
        });

    });
});
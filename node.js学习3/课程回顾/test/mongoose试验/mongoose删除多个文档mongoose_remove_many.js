/**
 * Created by malei on 2017/6/28.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('word',WordSchema);

mongoose.connect('mongodb://localhost/words');
mongoose.connection.once('open',function () {
    WordModel.find({word:/grat.*/},function (err,docs) {
        console.log('删除前：');
        for(var i in docs){
            console.log(docs[i].word);
            
        };
        var query=WordModel.remove();
        query.where('word').regex(/grati.*/);
        query.exec(function (err,results) {
            console.log(results.result.n);
            WordModel.find({word:/grat.*/},function (err,docs) {
                console.log('删除后：');
                for(var i in docs){
                    console.log(docs[i].word);
                    
                }
                mongoose.disconnect();
            });
            
        })
        
        
    })
})
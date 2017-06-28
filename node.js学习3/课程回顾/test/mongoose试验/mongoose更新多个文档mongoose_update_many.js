/**
 * Created by malei on 2017/6/28.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);

mongoose.connect('mongodb://localhost/words');
mongoose.connection.once('open',function () {
    WordModel.find({word:/grati.*/},function (err,docs) {
        console.log('更新前:');
        for(var i in docs){
            console.log(docs[i].word+" : "+docs[i].size);
        };

        var query=WordModel.update({},{$set:{size:0}});
        query.setOptions({multi:true});
        query.where('word').regex(/grati.*/);
        query.exec(function (err,results) {
            WordModel.find({word:/grat.*/},function (err,docs) {
                console.log('更新后:');
                for(var i in docs){
                    console.log(docs[i].word+" : "+docs[i].size);
                }
                mongoose.disconnect();
            })
        })
        
    })
})
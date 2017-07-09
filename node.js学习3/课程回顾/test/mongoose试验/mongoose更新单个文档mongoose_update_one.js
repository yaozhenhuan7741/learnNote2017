/**
 * Created by malei on 2017/6/28.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/words');
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);

mongoose.connection.once('open',function () {
    var query=WordModel.findOne().where('word','gratifaction');
    query.exec(function (err,doc) {
        console.log('更新前:');
        console.log(doc.toJSON());

        var query=doc.update({$set:{word:'gratifactions',size:13,last:'s'},$push:{letters:'s'}});
        query.exec(function (err,results) {
            console.log('被更新的文档'+results);
            WordModel.findOne().where('word','gratifactions').exec(function (err,doc) {
                console.log('更新后：'+doc.toString());
                mongoose.disconnect();
            })

        })
        

    })
});
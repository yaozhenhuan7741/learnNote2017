/**
 * Created by malei on 2017/6/28.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/words');
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);

mongoose.connection.once('open',function () {
    var query=WordModel.findOne().where('word','book');
    query.exec(function (err,doc) {
        console.log('文档是新的吗？'+ doc.isNew);
        console.log('更新前：'+doc.toString());
        doc.set('word','Book');
        doc.set('first','B');
        doc.set('charsets',[]);
        console.log('被修改的字段：');
        console.log(doc.modifiedPaths());
        doc.save(function (err) {
            console.log(err);
            
            WordModel.findOne().where('word','Book').exec(function (err,doc) {
                console.log('更新后：');
                console.log(doc);
                mongoose.disconnect();
            })
        })
    })

});
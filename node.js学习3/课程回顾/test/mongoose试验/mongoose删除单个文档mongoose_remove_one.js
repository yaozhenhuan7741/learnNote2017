/**
 * Created by malei on 2017/6/28.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);


mongoose.connect('mongodb://localhost/words');
mongoose.connection.once('open',function () {
    var query=WordModel.findOne().where('word','unhappy');
    query.exec(function (err,doc) {
        console.log('删除前：');
        console.log(doc);
        doc.remove(function (err,deletedDoc) {
            //console.log(deletedDoc);
            
            WordModel.findOne({word:'unhappy'},function (err,doc) {
                console.log('删除后：');
                console.log(doc);
                mongoose.disconnect();
                
            })
        })
        
    })
});
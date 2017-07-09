/**
 * Created by malei on 2017/6/29.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);

//添加验证方法
WordModel.schema.path('word').validate(function (value) {
    return value.length>0;
},"Word is too small!");  //当单词长度等于0时，返回错误信息

WordModel.schema.path('word').validate(function (value) {
    return value.length<20;
},"Word is too big");  //单词长度大于20时，返回错误信息



mongoose.connect('mongodb://localhost/words');
mongoose.connection.once('open',function () {
    var newWord=new WordModel({
        word:'thisisonlyatestdocment',
        first:'t',
        last:'t',
        size:'thisisonlyatestdocment'.length
    });
    newWord.save(function (err) {
        console.log(err.errors.word.message);
        console.log(String(err.errors.word));
        console.log(err.errors.word.type);
        console.log(err.errors.word.path);
        console.log(err.errors.word.value);
        console.log(err.name);
        console.log(err.message);

    })

});



setTimeout(function () {
    mongoose.disconnect()
},3000);
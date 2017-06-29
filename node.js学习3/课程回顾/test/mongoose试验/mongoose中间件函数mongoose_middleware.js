/**
 * Created by malei on 2017/6/29.
 */
var mongoose=require('mongoose');
//mongoose@4.7及之前版本可以正常运行
mongoose.Promise=global.Promise;
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);

//添加中间件函数
WordModel.schema.pre('init',function (next) {
    console.log('一个新的单词准备被初始化');  //此时doc对象还没创建
    next();
});

WordModel.schema.pre('validate',function (next) {
    console.log('%s 将要被验证',this.word);  //此时doc对象已创建，可以用this调用
    next();
});

WordModel.schema.pre('save',function (next) {
    console.log('%s 将要被保存',this.word);
    //设置单词的size字段
    console.log('设置单词size字段：%d',this.word.length);
    this.size=this.word.length;
    next();
});

WordModel.schema.pre('remove',function (next) {
    console.log('%s 将要被删除',this.word);
    
});

WordModel.schema.post('init',function (doc) {
    //init()执行完成后，doc对象就被创建好了
    console.log('%s 被初始化',doc.word);
    
});

WordModel.schema.post('validate',function (doc) {
    console.log('%s 被验证',doc.word);
});
WordModel.schema.post('save',function (doc) {
    console.log('%s 被保存',doc.word);
});
WordModel.schema.post('remove',function (doc) {
    console.log('%s 被删除',doc.word);
});


WordModel.schema.post('findOne',function (doc) {
    console.log('查询一个');
});
mongoose.connect('mongodb://localhost/words');
mongoose.connection.once('open',function () {
    var newWord=new WordModel({
        word:'newword',
        first:'n',
        last:'d',
        size:'newword'.length
    });
    console.log('保存');
    newWord.save(function (err) {
        console.log('查询');
        WordModel.findOne({word:'newword'},function (err,doc) {
            console.log('删除');
            newWord.remove(function (err) {
                mongoose.disconnect();
            })
        })
    })
});


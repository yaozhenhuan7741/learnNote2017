/**
 * Created by malei on 2017/6/28.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/words');
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);

mongoose.connection.once('open',function () {
    //创建Document对象，然后调用对象的save方法
    var newWord1=new WordModel({
        word:'gratifaction',
        first:'g',
        last:'n',
        size:12,
        letters:['g','r','a','t','i','f','c','o','n'],
        stats:{
            vowels:5,
            consonants:7
        }
    });
    console.log('该文档是新的吗? '+newWord1.isNew);
    newWord1.save(function (err,doc) {
        console.log('保存的文档：'+doc);

        
    });

    //创建普通对象，然后调用Model的create方法
    var newWord2={
        word:'googled',
        first:'g',last:'d',size:7,
        letters:['g','o','l','e','d'],
        stats:{
            vowels:3,
            consonants:4
        }
    };
    var newWord3={
        word:'selfie',
        first:'s',last:'e',size:6,
        letters:['s','e','l','f','i'],
        stats:{
            vowels:3,
            consonants:3
        }
    };
    WordModel.create([newWord2,newWord3],function (err) {
        //arguments表示所有参数；回调的第一个参数是err，后边的参数是每个文档
        for(var i=1;i<arguments.length;i++){
            console.log('创建文档：'+arguments[i]);
            
        }
    });

    setTimeout(function () {
        mongoose.disconnect();
    },3000);
});



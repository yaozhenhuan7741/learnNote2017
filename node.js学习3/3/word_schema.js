/**
 * Created by Administrator on 2017/2/3.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var wordSchema=new Schema({
    word:{type:String,index:1,required:true,unique:true},
    first:{type:String,index:1},
    last:{type:String},
    size:Number,
    letters:[String],
    stats:{
        vowels:Number,consonants:Number },
    charsets:[{type:String,chars:[String]}]
    }, {collection:'word_stats'});

wordSchema.methods.startsWith=function (letter) {
    return this.first==letter;
};

exports.wordSchema=wordSchema;
//console.log("Required Paths: ");
//console.log(wordSchema.requiredPaths());
//console.log("Indexs: ");
//console.log(wordSchema.indexes());
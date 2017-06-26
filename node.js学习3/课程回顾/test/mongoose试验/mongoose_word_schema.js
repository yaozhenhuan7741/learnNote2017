/**
 * Created by malei on 2017/6/26.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var wordSchema=new Schema({
    word:{type:String,index:1,required:true,unique:true},
    first:{type:String,index:1},
    last:String,
    size:Number,
    letters:[String],
    stats:{
        vowels:Number,
        consonants:Number
    },
    charsets:[{type:String,chars:[String]}]
},{collection:'word_stats'});

wordSchema.methods.startsWith=function (letter) {
    return this.first===letter;
};

exports.wordSchema=wordSchema;
console.log("Required Paths: ");
console.log(wordSchema.requiredPaths());
console.log('Index: ');
console.log(wordSchema.indexes());




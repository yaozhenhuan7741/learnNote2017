/**
 * Created by malei on 2017/6/29.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var WordSchema=require('./mongoose_word_schema').wordSchema;
var WordModel=mongoose.model('words',WordSchema);
mongoose.connect('mongodb://localhost/words');
mongoose.connection.once('open',function () {
    //第一种 aggregate(operations,callback)
    WordModel.aggregate(
        [
            {$match:{first:{$in:['a','e','i','o','u']}}},
            {$group:{_id:"$first",largest:{$max:"$size"},smallest:{$min:"$size"},total:{$sum:1}}},
            {$sort:{_id:1}}
        ],
        function (err,results) {
            console.log(results);
            
        }
    );

    //第二种 aggregate对象
    var aggregate=WordModel.aggregate();
    aggregate.group({_id:"$first",average:{$avg:"$size"}});
    aggregate.sort('-average');
    aggregate.limit(5);
    aggregate.exec(function (err,results) {
        console.log(results);
        
    });

    var aggregate=WordModel.aggregate();
    aggregate.match({size:4});
    aggregate.limit(5);
    aggregate.append({$project:{_id:"$word",stats:1}});
    aggregate.exec(function (err, results) {
        console.log(results);
        
    })
});

setTimeout(function () {
    mongoose.disconnect()
},3000);
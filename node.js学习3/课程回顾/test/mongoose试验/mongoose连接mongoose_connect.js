/**
 * Created by malei on 2017/6/26.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/words');
mongoose.connection.on('open',function () {
    console.log(mongoose.connection.collection);
    mongoose.connection.db.collections(function (err,names) {
        console.log(names);
        mongoose.disconnect();
    })

});


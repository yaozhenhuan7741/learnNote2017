/**
 * Created by Administrator on 2017/3/13.
 */
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

var settings=require('./settings');
mongoose.connect(settings.db);

require('./models/photo_model');

var Photo=mongoose.model('Photo');

Photo.remove().exec(function () {
    addPhoto('Strength', 'arch.jpg');
    addPhoto('Power', 'pyramid.jpg');
    addPhoto('Beauty', 'flower.jpg');
    addPhoto('Thoughtful', 'lake.jpg');
    addPhoto('Summer Fun', 'volcano.jpg');
    addPhoto('Sunsets', 'jump.jpg');
    addPhoto('a', 'a.jpg');
});

function  addPhoto(title,filename) {
    var photo=new Photo({title:title,filename:filename});
    photo.save(function () {
        console.log(filename+'保存成功');
    })
    
}

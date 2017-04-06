/**
 * Created by Administrator on 2017/4/6.
 */
var events=require('events');
function CarShow() {
    //定义对象，继承event
    events.EventEmitter.call(this);
    this.seeCar=function (make) { //参数 车
        this.emit('sawCar',make)
    }
}
CarShow.prototype.__proto__=events.EventEmitter.prototype;


function logCar(make) {
    console.log('看到一辆 '+make);
}

function logColorCar(make,color) {
    console.log('看到一辆 %s %s',color,make);
}

var show=new CarShow();
show.on('sawCar',logCar);
show.on('sawCar',function (make) {
    var colors=['红色','蓝色','黑色'];
    var color=colors[Math.floor(Math.random()*3)]; //取得随机数,然后取最近的整数
    logColorCar(make,color);
});

show.seeCar('法拉利');
show.seeCar('保时捷');
show.seeCar('布加迪威龙');
show.seeCar('阿斯顿马丁');
show.seeCar('兰博基尼');




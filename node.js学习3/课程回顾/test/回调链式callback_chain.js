/**
 * Created by Administrator on 2017/4/6.
 */
function logCar(car,callback) {
    console.log("看见一辆 %s",car);
    if(cars.length){
        process.nextTick(function () {
            callback();
        })
    }

}
function logCars(cars) {
    var car=cars.pop();
    logCar(car,function () {
        logCars(cars);
    });
}

var cars=['法拉利','布加迪威龙','阿斯顿马丁','QQ','mini','benzi'];
logCars(cars);
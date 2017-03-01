/**
 * Created by Administrator on 2017/1/18.
 */
function logCar(car,callback) {
    console.log("Saw a "+car);
    if(cars.length){
        process.nextTick(function () {
            callback();
        });
    };
}
function logCars(cars) {
    var car=cars.pop();
    logCar(car,function () {
        logCars(cars);
    });
}

var cars=["Ferrari","Porsche","Bugatti"]
logCars(cars);

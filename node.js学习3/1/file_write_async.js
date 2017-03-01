/**
 * Created by Administrator on 2017/1/20.
 */
var fs=require('fs');
var fruitBowl=['apple','orange','banana','grapes'];
function writeFruit(fd) {
    if(fruitBowl.length){
        var fruit=fruitBowl.pop()+" ";
        fs.write(fd,fruit,null,null,function (err,bytes) {
            if(err){
                console.log("Filte write failed.");
            }else {
                console.log("Wrote: %s %dbytes",fruit,bytes);
                writeFruit(fd);
            }
        });
    }else {
        fs.close(fd);
    }
}

fs.open('fruit.txt','w',function (err,fd) {
    writeFruit(fd);
});
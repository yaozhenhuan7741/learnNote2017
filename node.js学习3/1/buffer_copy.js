/**
 * Created by Administrator on 2017/1/19.
 */
var alphabet=new Buffer('abcedfghijklmnopqrstuvwxyz');
console.log(alphabet.toString())
//复制整个buffer
var blank=new Buffer(26);
blank.fill();
console.log("Blank:"+blank.toString());

alphabet.copy(blank);
console.log("Blank:"+blank.toString());

//复制一部分
var dashes=new Buffer(26);
dashes.fill('-');
console.log("dashes:"+dashes.toString());
alphabet.copy(dashes,9,10,15);
console.log("dashes:"+dashes.toString());
//缓冲区迭代
var dots=new Buffer('--------------------------');
dots.fill('.');
console.log("dots:"+dots.toString());
for (var i=0;i<dots.length;i++){
    if(i%2){
        dots[i]=alphabet[i];
    }
}
console.log("dots:"+dots.toString());
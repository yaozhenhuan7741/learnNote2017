/**
 * Created by Administrator on 2017/4/6.
 */
//缓冲区复制
var alphabet=new Buffer('abcdefghijklmnopgrstuvwxyz');
console.log(alphabet.toString());

//完全复制
var blank=new Buffer(26);
blank.fill();
console.log("Blank: "+blank.toString());
alphabet.copy(blank);
console.log("Blank: "+blank.toString());

//部分复制
var dashes=new Buffer(26);
dashes.fill('-');
console.log("Dashes: "+dashes.toString());
alphabet.copy(dashes,10,10,15);
console.log("Dashes: "+dashes.toString());

//迭代，隔一个复制一个
var dots=new Buffer('--------------------------');
dots.fill('.');
console.log('dots: '+dots.toString());
for(var i=0;i<dots.length;i++){
    if(i%2){
        dots[i]=alphabet[i];
    }
}
console.log('dots: '+dots.toString());


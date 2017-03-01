/**
 * Created by Administrator on 2017/1/20.
 */
var fs = require('fs');
var veggieTray = ['carrots','celery','olives'];
fd=fs.openSync('veggie.txt','w');
while(veggieTray.length){
    var veggie=veggieTray.pop()+" ";
    var bytes=fs.writeSync(fd,veggie,null,null);
    console.log("Wrote %s %dbytes",veggie,bytes)
}
/**
 * Created by Administrator on 2017/5/8.
 */
//一个子进程，负责出来message事件和将数据发送回父进程
process.on('message',function (message,parent) {
    var meal={};
    switch (message.cmd){
        case 'makeBreakfast':
            meal=['ham','eggs','toast'];
            break;
        case 'makeLunch':
            meal=['burger','fries','shake'];
            break;
        case 'makeDinner':
            meal=['soup','salad','steak'];
            break;
    }
    process.send(meal)
});
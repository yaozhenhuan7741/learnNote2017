/**
 * Created by malei on 2017/4/5.
 */
//此例子用于演示监听器和发射器
//存款取款,监听器用于监听账户金额变化--金额变化时,发射器触发事件.

var events=require('events');
function Account() {
    //定义账户类
    this.balance=0;//默认账户余额为0
    events.EventEmitter.call(this); //继承events.EventEmitter
    this.deposit=function (amount) {
        //存款
        this.balance+=amount;
        this.emit('balanceChanged');//触发金额变动事件
    };
    this.withDraw=function (amount) {
        //取款
        this.balance-=amount;
        this.emit('balanceChanged');
    }
}
Account.prototype.__proto__=events.EventEmitter.prototype; //通过原型继承
//定义几个回调函数
function displayBalance() {
    //显示余额
    console.log('账户余额:%d',this.balance); //使用this,表示调用它的账户
}
function checkOverdraw() {
    //检查是否透支
    if(this.balance<0){
        console.log('账户余额透支啦!!!');
    }
}
function checkGoal(acc,goal) {
    //定一个小目标,存点钱

    if(acc.balance > goal){
        console.log('恭喜你达到目标啦!');
    }
}

var account=new Account();
account.on('balanceChanged',displayBalance); //将回调函数附加到监听器
account.on('balanceChanged',checkOverdraw);
account.on('balanceChanged',function () {
    checkGoal(this,1000);//带参数的回调函数,可以放到一个不带参数的匿名函数里
});

account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withDraw(3000);
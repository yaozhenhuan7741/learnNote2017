/**
 * Created by Administrator on 2017/1/18.
 */
var events=require("events");

//定义类，账户
function Account() {
    //账户金额
    this.balance=0;

    //继承事件
    events.EventEmitter.call(this);

    //存款
    this.deposit=function (amount) {
        this.balance+=amount;
        this.emit('balanceChanged');
    };
    //取款
    this.withDraw=function (amount) {
        this.balance-=amount;
        this.emit('balanceChanged');
    };
};
//继承事件
Account.prototype.__proto__=events.EventEmitter.prototype;
function displayBalance() {
    console.log("Account balance:$%d",this.balance);
};
function checkOverDraw() {
    if(this.balance<0){
        console.log("Account overdrawn!!!");
    }
};
function checkGoal(acc,goal) {
    if(acc.balance > goal){
        console.log("Goal Achieved!!!");
    }
}

var account=new Account();
account.on("balanceChanged",displayBalance);
account.on("balanceChanged",checkOverDraw);
account.on("balanceChanged",function () {
    checkGoal(this,1000)
});

account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withDraw(1200);

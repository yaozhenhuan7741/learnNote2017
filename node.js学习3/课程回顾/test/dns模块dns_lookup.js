/**
 * Created by Administrator on 2017/5/9.
 */
//dns模块

var dns=require('dns');
console.log('解析www.google.com');
dns.resolve4('www.google.com',function (err,addresses) {
    console.log('IPv4 地址：'+JSON.stringify(addresses,false,' '));
    addresses.forEach(function (addr) {
        dns.reverse(addr,function (err,domains) {
            //console.log(err);
            console.log('地址 '+addr+' 的域名为:'+JSON.stringify(domains))
        })
    })
})
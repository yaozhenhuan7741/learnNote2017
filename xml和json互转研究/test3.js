

var xml2js=require('xml2js');
var builder=new xml2js.Builder();  //json->xml
var parseString = require('xml2js').parseString;  //xml->json


var aa='<?xml version="1.0" encoding="UTF-8"?><DATA><ReqHead><clientcode>jiuqi</clientcode><servicecode>TIMS-Server</servicecode><time>20160226111212218</time><ticket>a37a6fe0050b1de52519467193855881</ticket></ReqHead><BillBody><Busi_Serial_No>0001Z01000000000NXAK</Busi_Serial_No><UserNo>bx01</UserNo><UserName>报销人01</UserName><OrgNo>0001D310000000002GZU</OrgNo><OrgName>0001D310000000002GZU</OrgName></BillBody></DATA>';


var myObj={name:'malei'};

myXml =  builder.buildObject(myObj);
console.log(myXml);



parseString(aa, function (err, result) {
    console.dir(result);
});










var CM={
	//CM_GetID
	CM_GetID:function(){
	  soap.createClient(url, function(err, client) {
	  client.CM_GetID({}, function(err, result) {
		  console.log(result);
	  });
	});
	},
	
	//CMGetForOnePk
	CMGetForOnePk:function(pk){
	  soap.createClient(url, function(err, client) {
	  client.CMGetForOnePk({in0:pk}, function(err, result) {
		  console.log(result);
	  });
	});
	},
	
	//CMQuery
	CMQuery:function(query){
	  soap.createClient(url, function(err, client) {
	  client.CMQuery({in0:query}, function(err, result) {
		  console.log(result);
	  });
	});
	}
  
	
}

  

  

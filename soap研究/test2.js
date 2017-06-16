var soap=require('soap');
var url='http://127.0.0.1:8080/TIMS-Server/services/ContentInfoService?wsdl';

var query='<?xml version="1.0" encoding="GBK" ?><CMDATA>    <TRADETYPE>5</TRADETYPE>    <CIP>192.168.99.1</CIP>    <SYSTEM_CODE>网上报销</SYSTEM_CODE>    <BRANCH_NO>123456</BRANCH_NO>    <USER_NO>1101111</USER_NO>    <BUSI_SERIAL_NO>TCHZT123123</BUSI_SERIAL_NO>    <BATCH>        <BATCHID></BATCHID>    </BATCH></CMDATA>';




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

//CM.CMGetForOnePk('TCHZT123123');
//CM.CM_GetID();
CM.CMQuery(query);

  

  

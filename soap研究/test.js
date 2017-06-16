var soap=require('soap');
var url='http://192.168.30.194:8299/TIMS-Server/services/ContentInfoService?wsdl';

  soap.createClient(url, function(err, client) {
      client.CM_GetID({}, function(err, result) {
          console.log(result);
      });
  });
  

  
  
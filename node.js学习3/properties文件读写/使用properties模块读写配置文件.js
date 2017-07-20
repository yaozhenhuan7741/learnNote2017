var properties=require('properties');
properties.parse('./cm_config.properties',{path:true},function (err,obj) {
    if(!err){
        // console.log(obj);
        console.log(obj.wanip);
        obj.wanip='127.0.0.1';
        var newPro=properties.stringify(obj);
        console.log(newPro)
    }
});
properties.parse('./db.properties',{path:true},function (err,obj) {
    console.log(obj);

});
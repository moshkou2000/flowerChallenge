const readFile = require('./ReadFile');
const Algo = require('./Algo')

var  AlgoObj = new Algo();
  
 exports.myCallback = function  (err,data){

     if(err){
        return new Error("")
     }

     //console.log("mycallback: ", data)
      AlgoObj.setQueue(data); 
    


}

readFile.ReadFile()

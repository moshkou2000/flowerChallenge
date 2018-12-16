const Bouquet = require('./Bouquet')
const Requirement = require('./Requirement')

const EventEmitter = require('events');

const emmiter = new EventEmitter();
let start = false;
let stop = false;
let queue = [];

class Algo {

    constructor(){
        this.bouquets = []
        this.is_flower = false;
      
        this.requirements = [];
        this.counter = 0;

        this.init()      
    }

    init(){

        emmiter.on('Process', function(self){
            if (!stop && start) {
                self.getData(queue.shift());
            }
        });    
    }

    callProcess() {
        if (queue.length == 0) {
            setTimeout(()=>{ emmiter.emit('Process', this); }, 300);
        } else {
            emmiter.emit('Process', this);
        }
    }
    
    setQueue(data){
        queue.push(data);

        if(!start) {
            start = true;

            this.callProcess();
        }
    }

    getData(data) {
        if(this.is_flower) {
            this.sendFlowerToBouquet(data);
        } else if(data == "") {
            this.is_flower = true;  
            this.setRequirement()    
        } else {
            this.setBouquets(data);   
        }
    }

   async  sendFlowerToBouquet(type) {
        if(type == null || type == undefined){
            console.log("exit 1"); 
            stop = true;
            process.exit(0);
        }
        else if (this.counter == 256) {
            console.log("Whoops exit beacuse 256 Input "); 
            stop = true;
            process.exit(1);
        }

        this.counter++;

        for (let requirement of this.requirements) {
            await this.setFlowerProcess(requirement, type)
        }
        
        this.callProcess();
        
    }

    setFlowerProcess(requirement, type) {
        
        if(requirement.getType() == type) {

            var flag = true;

            for (var j = 0; flag &&  j < this.bouquets.length; j++) {

                if (this.bouquets[j].getName() == requirement.getSelected().getName()) {
                    
                    let fz = this.bouquets[j].getFlowers();

                    for (var i = 0; flag && i < fz.length; i++) {
                        
                        if((fz[i].getType() == type || (fz[i].getType().charAt(0) == fz[i].getType().charAt(0).toUpperCase())) && fz[i].getRemain() > 0  ) {
                            flag = false;                            
                            fz[i].setCurrentQty();
                            this.bouquets[j].setbouquetRemainMines();
                    
                            requirement.updateSelected();
                        }
                    }


                    //console.debug('this.bouquets[j].getRemain():\n',this.bouquets[j].getRemain(), this.bouquets[j])

                    // is DONE
                    if (this.bouquets[j].getTotalRemain() == 0) {
                        this.bouquets[j].reset();
                        //console.log("DONE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + this.bouquets[j].getText(), ": ", this.bouquets[j]);                        
                        console.log(this.bouquets[j].getText())
                    }

                   // flag = false;
                }
            }
        }
    }

    setBouquets(data){
        var tmpObj = new Bouquet(data);

        this.bouquets.push(tmpObj);
        
        this.callProcess();
    }

    async setRequirement() {

        let tempFlowers = [];
        
        this.bouquets.forEach(async(bouquet)=> {
        
            await bouquet.getFlowers().forEach(async (flower)=> {
               
                if(tempFlowers.indexOf(flower.getType()) == -1) {
                    tempFlowers.push(flower.getType());
                    this.requirements.push(new Requirement(flower.getType(), bouquet));

                } else {
                    for (let requirement of this.requirements) {
                        
                        if(requirement.getType() == flower.getType()) {
                            requirement.pushBouquet(bouquet);
                            break;
                        }
                    }
                }

            });
        });
        
        this.callProcess();
    }
}

module.exports=  Algo
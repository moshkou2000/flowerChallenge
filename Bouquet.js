
class Bouquet {

    constructor(line){
    
        this.bouquetRemain = 0;
        this.qtyDone    = 0;
        this.txt        = line;
        this.size       = line.charAt(1); 
        this.name       = line.charAt(0) + this.size;
        var s           = this.size
        
        let  d = line.slice(2, line.length);
        let flowersRaw = d.match(/\d+[a-z]/g).map(String)

        const _this = this;
        this.folowers = flowersRaw.map((value)=> x(value, _this))

        function x(value, self){
            var type=  value.slice(-1) + s;
            console.log("bouquet.js constractor",type)
            var fQty = parseInt(value.slice(0,value.length-1))
            _this.bouquetRemain += fQty;
            return new Flower(fQty, type);
        }


        this.qty = d.match(/\d+/g).map(Number).pop()  
        this.remain = this.qty;       
        
        let qty = this.qty - this.bouquetRemain;
        if (qty > 0) {
            this.folowers.push(new Flower(qty, this.name));
        }
    }

    getQtyDone() {
        return this.qtyDone;
    }

    getName() {
        return this.name;
    }

    getText() {
        return this.txt;
    }

    getTotalRemain(){
        return this.remain;
    }
    getRemain() {
        return this.bouquetRemain;
    }

    getFlowers() {
        return this.folowers;
    }

    reset() {

        this.remain = this.qty;
        this.qtyDone++;
        this.bouquetRemain = 0;

        this.folowers.forEach((flower) => {
            this.bouquetRemain += flower.reset();
        });
    }
    setbouquetRemainPlus(qty){
        this.bouquetRemain += qty;
    }
    setbouquetRemainMines(qty){
        this.bouquetRemain--;
        this.remain --;
    }

}



class Flower {
       
    constructor(qty, type){

            this.qty = qty;
            this.type = type;
            this.currentQty = 0;
            this.remain = qty;

         
    }

    setQt(qty) {
        this.qty = qty;
    }

    setType(type) {
        this.type = type;
    }

    setCurrentQty() {
        this.currentQty++;
        this.remain--;
        
       // bouquetRemain--;
    }


    setRemain(remain) {
        this.remain = remain;
    }


    getQty() {
        return this.qty;
    }

    getType() {
        return this.type;
    }
    
    getCurrentQty() {
        return this.currentQty;
    }
    
    getRemain() {
        return this.remain;
    }
    
    reset() {
        this.currentQty = 0;
        this.remain = this.qty;

        return this.remain;
    }
}

module.exports = Bouquet
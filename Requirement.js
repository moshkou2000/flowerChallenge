
class Requiremnt{

    constructor(type, bouquet){

        this.type = type;
        this.selected =  bouquet;
        this.bouquets =[];

        this.bouquets.push(bouquet);
    }

    setSelected(bouquet){
        this.selected = bouquet;
    }

    getSelected(){
        return this.selected;
    }

    getType() {
        return this.type;
    }

    getBouquetRemain() {
        for (let flower of this.selected.getFlowers()) {
            if (flower.getType() == this.type) {
                return flower.getRemain();
            }
        }
    }

    pushBouquet(bouquet){
        this.bouquets.push(bouquet);

        var flag = true;

        for (var i = 0; flag && i < this.bouquets.length; i++) {
            for (let f of this.bouquets[i].getFlowers()) {
                if (f.getType() == this.type && f.getRemain() > this.getBouquetRemain()) {
                    this.selected = this.bouquets[i];
                    flag = false;
                    break;
                }
            }
        }
    }

    updateSelected() {

        var flag = true;

        for (var i = 0; flag && i < this.bouquets.length; i++) {
            for (let f of this.bouquets[i].getFlowers()) {
                for (let sf of this.selected.getFlowers()) {
                        
                    if ((f.getType() == sf.getType() || (f.getType().charAt(0) == f.getType().charAt(0).toUpperCase())  ) && f.getRemain() > sf.getRemain()) {
                        this.selected = this.bouquets[i];
                        //flag = false;
                        //break;
                    }
                    
                }
            }
        }
    }

} 

module.exports = Requiremnt
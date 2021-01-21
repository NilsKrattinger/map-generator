const MapDescriptor = {
    nbRows: undefined,
    nbColumns: undefined,
    frequency: undefined,
    ile : undefined,
    ileSize : undefined,
    Lito : undefined,
    towns : undefined,
    riviere : undefined,
    result: {},

    changeNbColumn(nbColumn) {
        this.nbColumns = nbColumn;
    },
    changeNbRow(nbRow) {
        this.nbRows = nbRow;
    },
    changeFrequency(frequency) {
        this.frequency = frequency;
    },

    changeIle(ile){
        this.ile = ile;
    },

    changeIleSize(size){
        this.ileSize = size;
    },

    changeIleLito(lito){
        this.Lito = lito;
    },

    changeTowns(towns){
        this.towns = towns;
    },
    
    changeRiviere(riviere){
        this.riviere = riviere;
    },

    getResult(){
        if(this.result == undefined) {
           this.init();
        }
        return this.result;
    },

    init() {
        this.result = new Object();
        this.result.nbRows = this.nbRows;
        this.result.nbColumns = this.nbColumns;
        this.result.tile = new Array();
        this.result.biome = new Array();
        this.result.heat = new Array();
        this.result.moisture = new Array();
        this.result.elevation = new Array();
        this.result.towns = new Array();

        for (let i = 0; i < this.nbRows; i++) {
            this.result.tile[i] = new Array();
            this.result.heat[i] = new Array();
            this.result.moisture[i] = new Array();
            this.result.elevation[i] = new Array();
            this.result.biome[i] = new Array();



        }
    },


};

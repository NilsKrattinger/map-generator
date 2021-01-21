const MapDescriptor = {
    nbRows: undefined,
    nbColumns: undefined,
    frequency: undefined,
    ile : undefined,
    ileSize : undefined,
    Lito : undefined,
    towns : undefined,
    townsName : undefined,
    townsFrequency : undefined,
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

    changeTownsFrequency(frequency){
        this.townsFrequency = frequency;
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
        this.result.townsName = new Array();
        this.result.pathfinding = new Array();
        this.result.pathfindingRivier = new Array();

        this.result.foundedPath = new Array();
        this.result.usedInPath = new Array();
        this.result.usedInRiver = new Array();
        this.result.foundedRiver = new Array();
        this.result.sources = new Array();



        for (let i = 0; i < this.nbRows; i++) {
            this.result.tile[i] = new Array();
            this.result.heat[i] = new Array();
            this.result.moisture[i] = new Array();
            this.result.elevation[i] = new Array();
            this.result.biome[i] = new Array();
            this.result.pathfinding[i] = new Array();
            this.result.usedInPath[i] = new Array();
            this.result.usedInRiver[i] = new Array();
            this.result.pathfindingRivier[i] = new Array();





        }
    },


};

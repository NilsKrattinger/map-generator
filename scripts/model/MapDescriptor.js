const MapDescriptor = {
    rowNumber: undefined,
    columnsNumber: undefined,
    elevationFrequency: undefined,
    haveIle : undefined,
    ileSize : undefined,
    haveLittoral : undefined,
    haveTowns : undefined,
    townsNames : undefined,
    townsFrequency : undefined,
    result: {},

    SetColumnNumbers(nbColumn) {
        this.columnsNumber = nbColumn;
    },
    setRowNumbers(nbRow) {
        this.rowNumber = nbRow;
    },
    setElevationFrequency(elevationFrequency) {
        this.elevationFrequency = elevationFrequency;
    },

    setHaveIle(haveIle){
        this.haveIle = haveIle;
    },

    setIleSize(size){
        this.ileSize = size;
    },

    setIleLito(lito){
        this.haveLittoral = lito;
    },

    setTowns(towns){
        this.haveTowns = towns;
    },

    setTownsFrequency(frequency){
        this.townsFrequency = frequency;
    },

    init() {
        this.result = new Object();
        this.result.rowNumber = this.rowNumber;
        this.result.columnsNumber = this.columnsNumber;
        this.result.tile = new Array();
        this.result.biome = new Array();
        this.result.heat = new Array();
        this.result.moisture = new Array();
        this.result.elevation = new Array();
        this.result.haveTowns = new Array();
        this.result.townsNames = new Array();
        this.result.pathFinding = new Array();
        this.result.pathFindingRivier = new Array();

        this.result.foundedPath = new Array();
        this.result.usedInPath = new Array();
        this.result.usedInRiver = new Array();
        this.result.foundedRiver = new Array();
        this.result.sources = new Array();



        for (let i = 0; i < this.rowNumber; i++) {
            this.result.tile[i] = new Array();
            this.result.heat[i] = new Array();
            this.result.moisture[i] = new Array();
            this.result.elevation[i] = new Array();
            this.result.biome[i] = new Array();
            this.result.pathFinding[i] = new Array();
            this.result.usedInPath[i] = new Array();
            this.result.usedInRiver[i] = new Array();
            this.result.pathFindingRivier[i] = new Array();





        }
    },


};

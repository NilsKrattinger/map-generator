const MapDescriptor = {
    townsNames : undefined,
    rowNumber : undefined,
    columnsNumber : undefined,
    init() {
        this.tile = [];
        this.biome = [];
        this.heat = [];
        this.moisture = [];
        this.elevation = [];
        this.towns = [];
        this.townsNames = [];
        this.pathFinding = [];
        this.pathFindingRivier = [];
        this.foundedPath = [];
        this.usedInPath = [];
        this.usedInRiver = [];
        this.foundedRiver = [];
        this.sources = [];



        for (let i = 0; i < this.rowNumber; i++) {
            this.tile[i] = [];
            this.heat[i] = [];
            this.moisture[i] = [];
            this.elevation[i] = [];
            this.biome[i] = [];
            this.pathFinding[i] = [];
            this.usedInPath[i] = [];
            this.usedInRiver[i] = [];
            this.pathFindingRivier[i] = [];





        }
    },


};

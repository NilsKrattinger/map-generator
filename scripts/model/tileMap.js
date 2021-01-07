const tileMap = {
    frequency : undefined,
    data : {
        nbColumns : undefined,
        nbRows : undefined,
        elevation : [],
        tile : [],
    },

    changeNbColumn(nbColumn) {
        this.nbColumns = nbColumn;
    },
    changeNbRow(nbRow) {
        this.nbRows = nbRow;
    },

    updateTileMap(){
        this.data.nbRows = this.nbRows;
        this.data.nbColumns = this.nbColumns;
        this.data.elevation = new Array();

        for (let i = 0; i < this.nbRows; i++) {
            this.data.elevation[i] = new Array();
            this.data.tile[i] = new Array();
        }
    },

    generateNoAlgoMap() {
        for (let y = 0; y < this.data.nbRows; y++) {
            for (let x = 0; x < this.data.nbColumns; x++) {
                this.data.elevation[y][x] = new Point(128, 54);
            }
        }
        return this.data;
    },

    generatePerlinNoiseMap() {
        noise.seed(Math.random());
        for (let y = 0; y < this.data.nbColumns; y++) {
            for (let x = 0; x < this.data.nbRows; x++) {

                // All noise functions return values in the range of -1 to 1.

                let nx = x / this.data.nbColumns -0.5;
                let ny = y / this.data.nbRows -0.5;
                this.data.elevation[x][y] = (noise.simplex2(this.frequency * nx ,this.frequency * ny) +1) *0.5;
                console.log(x + " : " + y);
                console.log(this.data.elevation[x][y])
            }
        }
    },

    generatePerlinNoiseMap() { // TODO
        noise.seed(Math.random());
        for (let y = 0; y < this.data.nbColumns; y++) {
            for (let x = 0; x < this.data.nbRows; x++) {

                // All noise functions return values in the range of -1 to 1.

                let nx = x / this.data.nbColumns -0.5;
                let ny = y / this.data.nbRows -0.5;
                this.data.elevation[x][y] = (noise.simplex2(this.frequency * nx ,this.frequency * ny) +1) *0.5;
                console.log(x + " : " + y);
                console.log(this.data.elevation[x][y])
            }
        }
    }


};

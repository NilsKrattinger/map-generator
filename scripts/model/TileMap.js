const TileMap = {
    nbRows: undefined,
    nbColumns: undefined,

    changeNbColumn(nbColumn) {
        this.nbColumns = nbColumn;
    },
    changeNbRow(nbRow) {
        this.nbRows = nbRow;
    },

    generateNoAlgoMap() {
        let data = new Object();
        data.nbRows = this.nbRows;
        data.nbColumns = this.nbColumns;
        data.tile = new Array();

        for (let i = 0; i < this.nbRows; i++) {
            data.tile[i] = new Array();
        }

        for (let y = 0; y < this.nbRows; y++) {
            for (let x = 0; x < this.nbColumns; x++) {
                data.tile[y][x] = new Point(128, 54);
            }
        }
        return data;
    },

    generatePerlinNoiseMap() {
        noise.seed(Math.random());

        let data = new Object();
        data.nbRows = this.nbRows;
        data.nbColumns = this.nbColumns;
        data.tile = new Array();

        for (let i = 0; i < this.nbRows; i++) {
            data.tile[i] = new Array();
        }

        for (let y = 0; y < this.nbColumns; y++) {
            for (let x = 0; x < this.nbRows; x++) {

                // All noise functions return values in the range of -1 to 1.

                // noise.simplex2 and noise.perlin2 for 2d noise
                let nx = x / 10 -0.5;
                let ny = y / 10 -0.5;
                data.tile[x][y] = (noise.simplex2(nx,ny) +1) *0.5;
                console.log(x + " : " + y);
                console.log( data.tile[x][y])
            }
        }
    }

};
const TileMap = {
    nbRows : undefined,
    nbColumns : undefined,

    changeNbColumn(nbColumn) {
        this.nbColumns = nbColumn;
    },
    changeNbRow(nbRow) {
        this.nbRows = nbRow;
    },

    generateNoAlgoMap(){
           let data = new Object();
           data.nbRows = this.nbRows;
           data.nbColumns = this.nbColumns;
           data.tileCo = new Array();

           for (i = 0; i < this.nbColumns; i++) {
               for (j = 0; j < this.nbRows; j++) {
                   data.tileCo[i + i * j] = new Point(128, 54); // Set la tuile
               }
           }
           return data;
    },

};
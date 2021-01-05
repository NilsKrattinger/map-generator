const Controller = {

    changeNbRow(nbRow) {
        TileMap.changeNbRow(nbRow);
        this.generate();

    },
    changeNbColumn(nbColumn) {
        TileMap.changeNbColumn(nbColumn);
        this.generate();


    },

    init(row, columns) {
        TileMap.changeNbRow(row);
        TileMap.changeNbColumn(columns);
        this.generate();
    },

    canvasZoom(scale) {
    },

   async generate() {
        let res1 = await  TileMap.generatePerlinNoiseMap();
       let res = await TileMap.generateNoAlgoMap()
       View.printTile(res);
    },

};
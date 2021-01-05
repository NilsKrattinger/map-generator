const MainController = {

    changeNbRow(nbRow) {
        TileMap.changeNbRow(nbRow);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    changeNbColumn(nbColumn) {
        TileMap.changeNbColumn(nbColumn);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    changeSimplexFrequency(value) {
        TileMap.changeSimplexFrequency(value);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    init(row, columns) {
        TileMap.changeNbRow(row);
        TileMap.changeNbColumn(columns);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    canvasZoom(scale) {

    },

    async generate() {
        TileMap.updateTileMap();
        let res1 = await TileMap.generatePerlinNoiseMap();
        let res = await TileMap.generateNoAlgoMap();
        View.printTile(res);

    },

};

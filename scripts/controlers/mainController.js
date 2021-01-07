const MainController = {

    changeNbRow(nbRow) {
        tileMap.changeNbRow(nbRow);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    changeNbColumn(nbColumn) {
        tileMap.changeNbColumn(nbColumn);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    changeSimplexFrequency(value) {
        tileMap.changeSimplexFrequency(value);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    init(row, columns) {
        tileMap.changeNbRow(row);
        tileMap.changeNbColumn(columns);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    canvasZoom(scale) {

    },

    async generate() {
        tileMap.updateTileMap();
        let res1 = await tileMap.generatePerlinNoiseMap();
        let res = await tileMap.generateNoAlgoMap();
        let res2 = await tilesController.addTileUnique(res).catch(r => alert("erreur lors de la genration des tuiles" + r));
        console.log(res2);
        View.printTile(res2);

    },

};

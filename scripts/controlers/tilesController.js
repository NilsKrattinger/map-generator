const tilesController = {
    async addTileUnique(tileMap) {
        console.log(tileMap)

        for (let y = 0; y < tileMap.nbRows; y++) {
            for (let x = 0; x < tileMap.nbColumns; x++) {
                tileMap.tile[y][x] = new TitleGeneric();
                tileMap.tile[y][x].coordImg = new Point(128, 52);
            }
        }

        return tileMap;
    },

}
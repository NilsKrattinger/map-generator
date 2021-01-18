const MapDescriptorController = {
    async generate() {
        noise.seed(Math.random());
        await MapDescriptor.init();
        await this.generateElevation(MapDescriptor);
        await this.generateTemperature(MapDescriptor);
        await this.generateMoisture(MapDescriptor);
        await this.generateBiomAlgo1(MapDescriptor);
        await this.SetTileList(MapDescriptor);
        await this.tilefinder(MapDescriptor);
        console.log(MapDescriptor.result)
        console.log(plaine_normal[2])
        return MapDescriptor;
    },

    async generateElevation(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                let nx = y ;
                let ny = x ;
                data.result.elevation[x][y] = ((noise.simplex(data.frequency * nx, MapDescriptor.frequency * ny) + 1)) + ((noise.simplex(data.frequency * 2 * nx, data.frequency * 2 * ny) + 1));
            }
        }
    },

    async generateTemperature(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows ; x++) {
                // All noise functions return values in the range of -1 to 1.

                // noise.simplex for 2d noise
                let nx = x / 60;
                let ny = y / 60;

                data.result.heat[x][y] = ((noise.simplex(0.4 * nx , 0.4 * ny ) + 1) * 3);
                //console.log(data.result.heat[x][y])
            }
        }
    },

    async generateMoisture(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                // All noise functions return values in the range of -1 to 1.

                //biom size
                let nx = x / 5;
                let ny = y / 5;
                data.result.moisture[x][y] = ((noise.simplex(0.2 * nx, 0.2 * ny ) + 1) * 2);
            }
        }
    },

    async generateBiomAlgo1(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                //biom
                data.result.biome[x][y] = await this.biomeFinder(data.result.heat[x][y], data.result.moisture[x][y]);
            }
        }

    },

    async tilefinder(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                data.result.tile[x][y] = await this.findTile(data.result.biome[x][y], data.result.elevation[x][y]);
            }
        }

    },

    async biomeFinder(temp, moisture) {
        let biom;
        switch (true) {
            case temp >= 0 && temp < 1 :
                switch (true) {
                    case moisture >= 0 && moisture < 1:
                        biom = BiomEnum.Desert;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Savanne;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Sea;
                        break;
                    case moisture >= 3 && moisture < 4:
                        biom = BiomEnum.Sea;
                        break;
                }
                break;
            case temp >= 1 && temp < 2 :
                switch (true) {
                    case moisture >= 0 && moisture < 1:
                        biom = BiomEnum.Desert;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Sea;
                        break;
                    case moisture >= 3 && moisture < 4:
                        biom = BiomEnum.Sea;
                        break;
                }
                break;
            case temp >= 2 && temp < 3 :
                switch (true) {
                    case moisture >= 0 && moisture < 1:
                        biom = BiomEnum.Desert;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 3 && moisture < 4:
                        biom = BiomEnum.Plaine;
                        break;
                }
                break;
            case temp >= 3 && temp < 4 :
                switch (true) {
                    case moisture >= 0 && moisture < 1:
                        biom = BiomEnum.Savanne;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 3 && moisture < 4:
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
            case temp >= 4 && temp < 5 :
                switch (true) {
                    case moisture >= 0 && moisture < 1:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 3 && moisture < 4:
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
            case temp >= 5 && temp < 6 :
                switch (true) {
                    case moisture >= 0 && moisture < 1:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Snow;
                        break;
                    case moisture >= 3 && moisture < 4:
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
        }
        return biom;
    },

    async findTile(biome, altitude) {

        let tile;
        switch (biome) {
            case BiomEnum.Desert :
                switch (true) {

                    case altitude >= 2  :
                        tile = desert_normal[utils.getRandomInt(desert_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = desert_colline[utils.getRandomInt(desert_colline.length)];
                        break;
                    case altitude >= 0 && altitude < 1 :
                        tile = desert_montagne[utils.getRandomInt(desert_montagne.length)];
                        break;
                }
                break
            case BiomEnum.Sea :
                switch (true) {
                    case altitude >= 2 :
                        tile = jungle_normal[utils.getRandomInt(jungle_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = jungle_colline[utils.getRandomInt(jungle_colline.length)];
                        break;
                    case altitude >= 0 && altitude < 1 :
                        tile = jungle_montagne[utils.getRandomInt(jungle_montagne.length)];
                        break;
                }
                tile = new Point(6, 1)
                break
            case BiomEnum.Savanne :
                switch (true) {

                    case altitude >= 2 :
                        tile = savane_normal[utils.getRandomInt(savane_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = savane_colline[utils.getRandomInt(savane_colline.length)];
                        break;
                    case altitude >= 0 && altitude < 1 :
                        tile = savane_montagne[utils.getRandomInt(savane_montagne.length)];
                        break;
                }
                break;

            case BiomEnum.Snow :
                switch (true) {

                    case altitude >= 2  :
                        tile = neige_normal[utils.getRandomInt(neige_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = neige_colline[utils.getRandomInt(neige_colline.length)];
                        break;
                    case altitude >= 0 && altitude < 1 :
                        tile = neige_montagne[utils.getRandomInt(neige_montagne.length)];
                        break;
                }
                break;
            case BiomEnum.Plaine :
                switch (true) {

                    case altitude >= 2  :
                        tile = plaine_normal[utils.getRandomInt(plaine_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = plaine_colline[utils.getRandomInt(plaine_colline.length)];
                        break;
                    case altitude >= 0 && altitude < 1 :
                        tile = plaine_montagne[utils.getRandomInt(plaine_montagne.length)];
                        break;
                }
                break;
        }
        return tile;
    },

    async SetTileList(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                data.result.tile[x][y] = await this.findTile(data.result.heat[x][y], data.result.moisture[x][y], data.result.elevation[x][y]);

            }
        }
    }

}

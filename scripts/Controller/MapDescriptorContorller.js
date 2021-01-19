const MapDescriptorController = {
    async generate() {
        noise.seed(Math.random());
        await MapDescriptor.init();
        await this.generateElevation(MapDescriptor);
        await this.generateTemperature(MapDescriptor);
        await this.generateMoisture(MapDescriptor);

        await this.islender(MapDescriptor.result.heat, MapDescriptor, 10, 0)
        await this.islender(MapDescriptor.result.moisture, MapDescriptor, 10, 4)


        await this.smoother(MapDescriptor.result.heat, MapDescriptor, 3);
        await this.smoother(MapDescriptor.result.elevation, MapDescriptor, 1);
        await this.smoother(MapDescriptor.result.moisture, MapDescriptor, 1);


        console.log(MapDescriptor.result.heat)

        await this.generateBiomAlgo1(MapDescriptor);


        await this.smoother(MapDescriptor.result.heat, MapDescriptor, 1);
        await this.smoother(MapDescriptor.result.moisture, MapDescriptor, 1);

        await this.holeFixer(MapDescriptor);

       // await this.townPlacment(MapDescriptor);

        await this.litoMaker(MapDescriptor);

        await this.SetTileList(MapDescriptor);
        await this.tilefinder(MapDescriptor);

        return MapDescriptor;

    },

    async generateElevation(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                let nx = y;
                let ny = x;
                data.result.elevation[x][y] = ((noise.simplex(data.frequency * nx, MapDescriptor.frequency * ny) + 1) * 2);
            }
        }
    },

    async generateTemperature(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                let nx = x / 60;
                let ny = y / 60;

                data.result.heat[x][y] = ((noise.simplex(0.4 * nx, 0.4 * ny) + 1) * 3);
            }
        }
        console.log(data.result);
    },

    async generateMoisture(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                let nx = x / 5;
                let ny = y / 5;

                data.result.moisture[x][y] = ((noise.simplex(0.2 * nx, 0.2 * ny) + 1) * 2);
            }
        }
    },

    async generateBiomAlgo1(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
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

    async holeFixer(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                let neightbourBiom = new Set();
                let neightbour = utils.neighbour(new Point(x, y), data.nbRows, data.nbColumns);
                neightbour.forEach(function (item, index, array) {
                    neightbourBiom.add(data.result.biome[item.x][item.y]);
                });

                if (!neightbourBiom.has(data.result.biome[x][y])) {
                    let copiedNeight = neightbour[utils.getRandomInt(neightbour.length)]
                    data.result.biome[x][y] = data.result.biome[copiedNeight.x][copiedNeight.y]
                }
            }
        }

    },

    async litoMaker(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                let neightbourBiom = new Set();
                let neightbour = utils.neighbour(new Point(x, y), data.nbRows, data.nbColumns);
                neightbour.forEach(function (item, index, array) {
                    neightbourBiom.add(data.result.biome[item.x][item.y]);
                });

                if (neightbourBiom.has(BiomEnum.Sea) && neightbourBiom.has(BiomEnum.Plaine)){
                    data.result.biome[x][y] = BiomEnum.Desert;
                    data.result.elevation[x][y] = 2;
                }
            }
        }

    },


    async smoother(layer, data, occ) {
        for (let i = 0; i < occ; i++) {
            for (let y = 0; y < data.nbColumns; y++) {
                for (let x = 0; x < data.nbRows; x++) {

                    let neighbour = utils.neighbour(new Point(x, y), data.nbRows, data.nbColumns);

                    layer[x][y] = await utils.avgArray(neighbour, layer);

                }
            }
        }
    },

    async islender(layer, data, k, v) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                let distance = utils.distancePoint(new Point(x, y), new Point(data.nbRows / 2, data.nbColumns / 2));

                if (distance > k) {
                    layer[x][y] = v;
                }

            }
        }
    },

    async SetTileList(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                data.result.tile[x][y] = await this.findTile(data.result.heat[x][y], data.result.moisture[x][y], data.result.elevation[x][y]);

            }
        }
    },

    async townPlacment(data, freq){
        let tileNumber = data.nbColumns * data.nbRows;
        let nbTown = tileNumber * freq;
        let townPlaces = new Set;

        for (let i = 0; i < nbTown; i++) {

            let point = new Point(utils.getRandomInt(data.nbColumns),utils.getRandomInt(data.row));
            if(data.result.biome[point.x][point.y] != BiomEnum.Sea){
                townPlaces.push(point);
            }
        }

        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {

                if(townPlaces.has(new Point(x,y))){
                    data.result.towns[x][y] = 1;

                } else {
                    data.result.towns[x][y] = 0;
                }

            }
        }

    },

    // HORROR SHOW HERE

    async biomeFinder(temp, moisture) {
        let biom;
        switch (true) {
            case temp < 1 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Desert;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Savanne;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Sea;
                        break;
                    case moisture >= 3 :
                        biom = BiomEnum.Sea;
                        break;
                }
                break;
            case temp >= 1 && temp < 2 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Desert;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Sea;
                        break;
                    case moisture >= 3 :
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
                    case moisture >= 3 :
                        biom = BiomEnum.Plaine;
                        break;
                }
                break;
            case temp >= 3 && temp < 4 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Savanne;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 3 :
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
            case temp >= 4 && temp < 5 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 3 :
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
            case temp >= 5 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Plaine;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Snow;
                        break;
                    case moisture >= 3 :
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


}

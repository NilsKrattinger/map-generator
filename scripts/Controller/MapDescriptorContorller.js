const MapDescriptorController = {

    // ** Methode de generation du init
    async generate() {
        noise.seed(Math.random());
        MapDescriptor.rowNumber = configurationDescriptor.rowNumber;
        MapDescriptor.columnsNumber = configurationDescriptor.columnsNumber;
        await MapDescriptor.init();

        await this.generateElevation(MapDescriptor, configurationDescriptor);
        await this.generateTemperature(MapDescriptor);
        await this.generateMoisture(MapDescriptor);

        if (configurationDescriptor.haveIle) {
            await this.ileMaker(MapDescriptor.heat, MapDescriptor, configurationDescriptor.ileSize, 0)
            await this.ileMaker(MapDescriptor.moisture, MapDescriptor, configurationDescriptor.ileSize, 4)
        }

        await this.smoother(MapDescriptor.heat, MapDescriptor, configurationDescriptor.heatSmoothingSlider);

        await this.smoother(MapDescriptor.elevation, MapDescriptor, configurationDescriptor.elevationSmootingSlider);

        await this.smoother(MapDescriptor.moisture, MapDescriptor, configurationDescriptor.moistureSmootingSlider);

        await this.generateBiomAlgo1(MapDescriptor);

        await this.holeFixer(MapDescriptor);

        if (configurationDescriptor.haveLittoral) {

            await this.beachMaker(MapDescriptor);
            await this.litoMaker(MapDescriptor);

        }

        await this.snowCheck(MapDescriptor);


        await this.holeFixer(MapDescriptor);


        await this.SetTileList(MapDescriptor);


        if (configurationDescriptor.haveTowns) {
            await this.townPlacement(MapDescriptor, configurationDescriptor.townsFrequency);
            await this.nameTown(MapDescriptor);
            await this.linkTown(MapDescriptor);
        }

        if (configurationDescriptor.hasRiver) {
            await this.generateRivers(MapDescriptor, configurationDescriptor)
        }

        return MapDescriptor;
    },


    async generateElevation(data, conf) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {

                data.elevation[x][y] = ((noise.simplex(conf.elevationFrequency * y, conf.elevationFrequency * x) + 1) * 2);
            }
        }
    }
    ,

    async generateTemperature(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {

                let nx = x / 60;
                let ny = y / 60;

                data.heat[x][y] = ((noise.simplex(0.4 * nx, 0.4 * ny) + 1) * 3);
            }
        }
    }
    ,

    async generateMoisture(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let nx = x / 5;
                let ny = y / 5;

                data.moisture[x][y] = ((noise.simplex(0.2 * nx, 0.2 * ny) + 1) * 2);
            }
        }
    }
    ,

    async generateBiomAlgo1(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                data.biome[x][y] = await this.biomeFinder(data.heat[x][y], data.moisture[x][y]);
            }
        }

    }
    ,


    async holeFixer(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let neighbourBiom = new Set();
                let neighbour = utils.neighbors(new Point(x, y), data.rowNumber, data.columnsNumber);
                neighbour.forEach(function (item) {
                    neighbourBiom.add((data.biome[item.x][item.y]).toString());
                });

                if (!neighbourBiom.has((data.biome[x][y]).toString())) {
                    let copiedNeighbour = neighbour[utils.getRandomInt(neighbour.length)]
                    data.biome[x][y] = data.biome[copiedNeighbour.x][copiedNeighbour.y]
                }
            }
        }

    }
    ,

    async beachMaker(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let neighbourBiom = new Set();
                let neighbour = utils.neighbors(new Point(x, y), data.rowNumber, data.columnsNumber);
                neighbour.forEach(function (item) {
                    neighbourBiom.add(data.biome[item.x][item.y]);
                });

                if (neighbourBiom.has(BiomEnum.Sea) && ((neighbourBiom.has(BiomEnum.Meadow) || neighbourBiom.has(BiomEnum.Desert) || neighbourBiom.has(BiomEnum.Snow)))) {
                    data.biome[x][y] = BiomEnum.Beach;
                    data.elevation[x][y] = 2;
                }
            }
        }

    }
    ,

    async litoMaker(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let neighbourBiom = new Set();
                let neighbour = utils.neighbors(new Point(x, y), data.rowNumber, data.columnsNumber);

                neighbour.forEach(function (item) {
                    neighbourBiom.add(data.biome[item.x][item.y]);
                });

                if (data.biome[x][y] !== BiomEnum.Beach && neighbourBiom.has(BiomEnum.Sea) && (neighbourBiom.has(BiomEnum.Meadow) || neighbourBiom.has(BiomEnum.Snow) || neighbourBiom.has(BiomEnum.Desert) || neighbourBiom.has(BiomEnum.Beach) || neighbourBiom.has(BiomEnum.Savanna))) {
                    data.biome[x][y] = BiomEnum.Littoral;
                    data.elevation[x][y] = 2;
                }
            }
        }

    }
    ,

    async snowCheck(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let neighbourBiom = new Set();
                let neighbour = utils.neighbors(new Point(x, y), data.rowNumber, data.columnsNumber);
                neighbour.forEach(function (item) {
                    neighbourBiom.add(data.biome[item.x][item.y]);
                });

                if (neighbourBiom.has(BiomEnum.Snow) && (neighbourBiom.has(BiomEnum.Desert) || neighbourBiom.has(BiomEnum.Savanna))) {
                    data.biome[x][y] = BiomEnum.Meadow;
                    data.elevation[x][y] = 2;
                }
            }
        }

    }
    ,

    async smoother(layer, data, occ) {
        for (let i = 0; i < occ; i++) {
            for (let y = 0; y < data.columnsNumber; y++) {
                for (let x = 0; x < data.rowNumber; x++) {

                    let neighbors = utils.neighbors(new Point(x, y), data.rowNumber, data.columnsNumber);
                    layer[x][y] = await utils.avgArray(neighbors, layer);
                }
            }
        }
    }
    ,

    async ileMaker(layer, data, k, v) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {

                let distance = utils.distancePointByRand(new Point(x, y), new Point(data.rowNumber / 2, data.columnsNumber / 2));
                if (distance > k) {
                    layer[x][y] = v;

                }

            }
        }
    }
    ,

    async SetTileList(data) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {

                data.tile[x][y] = await this.findTile(data.biome[x][y], data.elevation[x][y]);

            }
        }
    }
    ,

    async nameTown(data) {
        let nameList = town_name.slice();
        for (let i = 0; i < data.towns.length; i++) {

            let index = utils.getRandomInt(nameList.length);
            data.townsNames.push(nameList[index]);
            nameList.splice(index, 1);
        }
    },

    async generateRivers(data, conf) {
        if (conf.hasRiver)
            await this.SourcesPlacement(MapDescriptor, 0.002);
        for (let i = 0; i < data.sources.length; i++) {
            let end = await RivierMaker.waterFinder(data, data.sources[i]);
            if (end) {
                let river = await (RivierMaker.pathfinderForRivier(data, end, data.sources[i])).slice();
                if (river) {
                    data.foundedRiver.push(river);
                }
            }


        }
    },

    async linkTown(data) {
        if (data.towns.length >= 2) {
            let j = 0;
            for (let i = 0; i < data.towns.length; i++) {
                for (let k = j; k < data.towns.length; k++) {
                    let path = await (pathFinder.pathfinder(data, data.towns[i], data.towns[k])).slice();
                    data.foundedPath.push(path);
                }
                j++;
            }
        }
    },

    async townPlacement(data, freq) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let biome = data.biome[x][y];
                let tile;
                if (Math.random() < freq && biome !== BiomEnum.Sea) {
                    switch (biome) {
                        case BiomEnum.Desert:
                        case BiomEnum.Savanna:
                        case BiomEnum.Beach :
                            tile = desert_town[utils.getRandomInt(desert_town.length)];
                            break;
                        case BiomEnum.Meadow:
                            tile = plain_town[utils.getRandomInt(snow_town.length)];
                            break;
                        case BiomEnum.Snow:
                            tile = snow_town[utils.getRandomInt(plain_town.length)];
                            break;
                        case BiomEnum.Littoral:
                            tile = litoral_town[utils.getRandomInt(litoral_town.length)];
                            break;
                    }
                    data.tile[x][y] = tile;
                    data.towns.push(new Point(x, y));
                }
            }
        }
    }
    ,

    async SourcesPlacement(data, freq) {
        for (let y = 0; y < data.columnsNumber; y++) {
            for (let x = 0; x < data.rowNumber; x++) {
                let biome = data.biome[x][y];
                if (Math.random() < freq && biome !== BiomEnum.Desert && biome !== BiomEnum.Sea && biome !== BiomEnum.Littoral) {
                    data.sources.push(new Point(x, y));
                }
            }
        }
    }
    ,

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
                        biom = BiomEnum.Savanna;
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
                        biom = BiomEnum.Meadow;
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
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 3 :
                        biom = BiomEnum.Meadow;
                        break;
                }
                break;
            case temp >= 3 && temp < 4 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Savanna;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 3 :
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
            case temp >= 4 && temp < 5 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 2 && moisture < 3:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 3 :
                        biom = BiomEnum.Snow;
                        break;
                }
                break;
            case temp >= 5 :
                switch (true) {
                    case moisture < 1:
                        biom = BiomEnum.Meadow;
                        break;
                    case moisture >= 1 && moisture < 2:
                        biom = BiomEnum.Meadow;
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
    }
    ,

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
                    case  altitude < 1 :
                        tile = desert_montagne[utils.getRandomInt(desert_montagne.length)];
                        break;
                }


                break
            case BiomEnum.Sea :
                tile = sea_normal[0];


                break;
            case BiomEnum.Littoral :
                tile = litoral_normal[0];


                break;
            case BiomEnum.Beach :
                tile = beach_normal[utils.getRandomInt(beach_normal.length)];


                break;
            case BiomEnum.Savanna :
                switch (true) {

                    case altitude >= 2 :
                        tile = savane_normal[utils.getRandomInt(savane_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = savane_colline[utils.getRandomInt(savane_colline.length)];
                        break;
                    case altitude < 1 :
                        tile = savane_montagne[utils.getRandomInt(savane_montagne.length)];
                        break;
                }


                break;

            case BiomEnum.Snow :
                switch (true) {

                    case altitude >= 2  :
                        tile = neige_normal[utils.getRandomInt(neige_normal.length)];
                        break;
                    case altitude >= 1.5 && altitude < 2 :
                        tile = neige_colline[utils.getRandomInt(neige_colline.length)];
                        break;
                    case altitude < 1.5 :
                        tile = neige_montagne[utils.getRandomInt(neige_montagne.length)];
                        break;
                }


                break;
            case BiomEnum.Meadow :
                switch (true) {

                    case altitude >= 2  :
                        tile = plaine_normal[utils.getRandomInt(plaine_normal.length)];
                        break;
                    case altitude >= 1 && altitude < 2 :
                        tile = plaine_colline[utils.getRandomInt(plaine_colline.length)];
                        break;
                    case altitude < 1 :
                        tile = plaine_montagne[utils.getRandomInt(plaine_montagne.length)];
                        break;
                }


                break;
        }


        return tile;
    }
    ,


}

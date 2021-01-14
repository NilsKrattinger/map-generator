const MapDescriptorController = {
    async generate() {
        await MapDescriptor.init();
        await this.generateElevation(MapDescriptor);
        await this.generateTemperature(MapDescriptor);
        await this.generateNoAlgoMap(MapDescriptor);
        console.log(MapDescriptor.result)
        return MapDescriptor;
    },

    async generateNoAlgoMap(data) {
        for (let y = 0; y < data.nbRows; y++) {
            for (let x = 0; x < data.nbColumns; x++) {
                data.result.tile[y][x] = new Point(96, 97);
            }
        }
    },

    async generateElevation(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                // All noise functions return values in the range of -1 to 1.

                // noise.simplex2 and noise.perlin for 2d noise
                let nx = x / 10 -0.5;
                let ny = y / 10 -0.5;

                //map the -1 1 range to 0 : 2 + range 0 to 2
                data.result.tile[x][y] = ((noise.simplex(data.frequency * nx,MapDescriptor.frequency * ny) +1)) + ((noise.simplex(data.frequency * 2 *  nx,data.frequency * 2 * ny) +1)) ;
                //console.log(x + " : " + y);
                //console.log( data.result.tile[x][y])
            }
        }
    },

    async generateTemperature(data) {
        for (let y = 0; y < data.nbColumns; y++) {
            for (let x = 0; x < data.nbRows; x++) {
                // All noise functions return values in the range of -1 to 1.

                // noise.simplex for 2d noise
                let nx = x / 10 ;
                let ny = y / 10 ;

                //map the -1 1 range to 0 : 2
                data.result.heat[x][y] = ((noise.simplex( nx, ny) /*+1*/) /* 2.5*/);
               // console.log("Heat in " + x + " : " + y);
                console.log( data.result.heat[x][y])
            }
        }
    }

}
const Controller = {
    setNbRow(nbRow) {
        MapDescriptor.setRowNumbers(nbRow);
    },

    setNbColumn(nbColumn) {
        MapDescriptor.SetColumnNumbers(nbColumn);
    },

    setElevationFrequency(elevationFrequency) {
        MapDescriptor.setElevationFrequency(elevationFrequency);
    },

    setIle(ile) {
        MapDescriptor.setHaveIle(ile);

    },

    setIleSize(ileSize) {
        MapDescriptor.setIleSize(ileSize);
    },

    setIleLitto(litto){
        MapDescriptor.setIleLitto(litto);
    },

    setTowns(towns){
        MapDescriptor.setTowns(towns);
    },

    setTownsFrequency(frequency){
        MapDescriptor.setTownsFrequency(frequency);
    },

    init() {
        noise.seed(Math.random());
        },

    async generate() {
        let mapDescriptor = await MapDescriptorController.generate();
        View.printTile(mapDescriptor);
    },

};

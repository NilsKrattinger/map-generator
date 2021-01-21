const Controller = {
    //
    setNbRow(nbRow) {
        MapDescriptor.setRowNumbers(nbRow);
    },

    setNbColumn(nbColumn) {
        MapDescriptor.SetColumnNumbers(nbColumn);
    },

    setelevationFrequency(elevationFrequency) {
        MapDescriptor.setElevationFrequency(elevationFrequency);
    },

    setIle(ile) {
        MapDescriptor.setHaveIle(ile);
        (MapDescriptor);

    },

    setIleSize(ileSize) {
        MapDescriptor.setIleSize(ileSize);
    },

    setIleLito(lito){
        MapDescriptor.setIleLito(lito);
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

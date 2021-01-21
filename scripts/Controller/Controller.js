const Controller = {
    //
    changeNbRow(nbRow) {
        MapDescriptor.changeNbRow(nbRow);
    },

    changeNbColumn(nbColumn) {
        MapDescriptor.changeNbColumn(nbColumn);
    },

    changeFrequency(frequency) {
        MapDescriptor.changeFrequency(frequency);
    },

    changeIle(ile) {
        MapDescriptor.changeIle(ile);
        console.log(MapDescriptor);

    },

    changeIleSize(ileSize) {
        MapDescriptor.changeIleSize(ileSize);
    },

    changeIleLito(lito){
        MapDescriptor.changeIleLito(lito);
    },

    changeTowns(towns){
        MapDescriptor.changeTowns(towns);
    },

    changeTownsFrequency(frequency){
        MapDescriptor.changeTownsFrequency(frequency);
    },

    init() {
        noise.seed(Math.random());
        },

    async generate() {
        let mapDescriptor = await MapDescriptorController.generate();
        View.printTile(mapDescriptor);
    },

};

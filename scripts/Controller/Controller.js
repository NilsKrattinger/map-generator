const Controller = {

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

    changeRiviere(riviere){
        MapDescriptor.changeRiviere(riviere);
    },

    setElevationSlider(elevationSlider){
        MapDescriptor.setElevationSlider(elevationSlider);
    },

    setHumiditeSlider(humiditeSlider){
        MapDescriptor.setHumiditeSlider(humiditeSlider);
    },

    setTemperatureSlider(temperatureSlider){
        MapDescriptor.setTemperatureSlider(temperatureSlider);
    },



    init(row, columns, frequency) {
        MapDescriptor.changeNbRow(row);
        MapDescriptor.changeNbColumn(columns);
        MapDescriptor.changeFrequency(frequency);
        noise.seed(Math.random());

        this.generate().catch(r => alert("Erreur : " + r));
    },

    canvasZoom(scale) {
    },

    async generate() {
        let mapDescriptor = await MapDescriptorController.generate();
        View.printTile(mapDescriptor);
    },

};

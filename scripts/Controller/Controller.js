const Controller = {
    setNbRow(nbRow) {
        configurationDescriptor.setRowNumbers(nbRow);
    },

    setNbColumn(nbColumn) {
        configurationDescriptor.SetColumnNumbers(nbColumn);
    },

    setElevationFrequency(elevationFrequency) {
        configurationDescriptor.setElevationFrequency(elevationFrequency);
    },

    setIle(ile) {
        configurationDescriptor.setHaveIle(ile);

    },

    setIleSize(ileSize) {
        configurationDescriptor.setIleSize(ileSize);
    },

    setIleLitto(litto){
        configurationDescriptor.setIleLitto(litto);
    },

    setTowns(towns){
        configurationDescriptor.setHaveTowns(towns);
    },

    setTownsFrequency(frequency){
        configurationDescriptor.setTownsFrequency(frequency);
    },
    SetRiver(riviere){
        configurationDescriptor.changeRiviere(riviere);
    },

    setElevationSlider(elevationSlider){
        configurationDescriptor.setElevationSlider(elevationSlider);
    },

    setHumiditeSlider(humiditeSlider){
        configurationDescriptor.setHumiditeSlider(humiditeSlider);
    },

    setTemperatureSlider(temperatureSlider){
        configurationDescriptor.setTemperatureSlider(temperatureSlider);
    },



    init() {
        noise.seed(Math.random());
        },

    async generate() {

        let mapDescriptor = await MapDescriptorController.generate();
        View.printTile(mapDescriptor);
    },

};

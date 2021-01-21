const configurationDescriptor = {
    rowNumber: undefined,
    columnsNumber: undefined,
    elevationFrequency: undefined,
    haveIle : undefined,
    ileSize : undefined,
    haveLittoral : undefined,
    haveTowns : undefined,
    townsFrequency : undefined,
    hasRiver : undefined,
    heatSmoothingSlider : undefined,
    moistureSmootingSlider : undefined,
    elevationSmootingSlider : undefined,

    SetColumnNumbers(nbColumn) {
        this.columnsNumber = nbColumn;
    },
    setRowNumbers(nbRow) {
        this.rowNumber = nbRow;
    },
    setElevationFrequency(elevationFrequency) {
        this.elevationFrequency = elevationFrequency;
    },

    setHaveIle(haveIle){
        this.haveIle = haveIle;
    },

    setIleSize(size){
        this.ileSize = size;
    },

    setIleLitto(litto){
        this.haveLittoral = litto;
    },

    setHaveTowns(towns){
        this.haveTowns = towns;
    },

    changeRiviere(riviere){
        this.hasRiver = riviere;
    },

    setTownsFrequency(frequency) {
        this.townsFrequency = frequency;
    },
    setElevationSlider(elevationSlider){
        this.elevationSmootingSlider = elevationSlider;
    },

    setHumiditeSlider(humiditeSlider){
        this.moistureSmootingSlider=humiditeSlider;
    },

    setTemperatureSlider(temperatureSlider){
        this.heatSmoothingSlider=temperatureSlider;
    },

}
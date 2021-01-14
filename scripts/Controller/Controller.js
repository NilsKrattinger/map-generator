const Controller = {

    changeNbRow(nbRow) {
        MapDescriptor.changeNbRow(nbRow);
        this.generate().catch(r => alert("Erreur : " + r) );

    },

    changeNbColumn(nbColumn) {
        MapDescriptor.changeNbColumn(nbColumn);
        this.generate().catch(r => alert("Erreur : " + r) );


    },

    changeFrequency(frequency) {
        MapDescriptor.changeFrequency(frequency);
        this.generate().catch(r => alert("Erreur : " + r) );
    },

    init(row, columns,frequency) {
        MapDescriptor.changeNbRow(row);
        MapDescriptor.changeNbColumn(columns);
        MapDescriptor.changeFrequency(frequency);
        noise.seed(Math.random());

        this.generate().catch(r => alert("Erreur : " + r) );
    },

    canvasZoom(scale) {
    },

    async generate() {
        let mapDescriptor = await MapDescriptorController.generate();
        console.log(mapDescriptor)
        View.printTile(mapDescriptor);
    },

};

const View = {
// ** Refs
    canvasContainer: undefined,
    canvasElement: undefined,
    rowField: undefined,
    columnField: undefined,
    generateButton: undefined,
    canvasZoomSlider: undefined,
    simplexFrequency: undefined,

    // ** Listener

    onUpdateGenerate() {
        MainController.generate().catch(r => alert("Erreur lors de l'execution" + r));

    },

    onUpdateRowNumber() {
        MainController.changeNbRow(this.rowField.value);

    },

    onUpdateColumnsNumber() {
        MainController.changeNbColumn(this.columnField.value);

    },

    onUpdateZoomSlider() {
        console.log(this)

    },

    onFrequrncyUpdate() {
        MainController.changeSimplexFrequency(this.simplexFrequency.value);
    },


    // ** Render methods
    printTile(tileMap) {
        const HEXTILES_IMAGE = new Image();
        HEXTILES_IMAGE.src = 'src/hextiles.png';
        let CnvCtx = this.canvasElement.getContext('2d');
        Promise.all([
            new Promise((resolve) => {
                HEXTILES_IMAGE.addEventListener('load', () => {
                    resolve();
                });
            })
        ])
            .then(() => {
                CnvCtx.clearRect(0, 0, CnvCtx.canvas.width, CnvCtx.canvas.height);

                for (let y = 0; y < tileMap.nbRows; y++) { // old J
                    for (let x = 0; x < tileMap.nbColumns; x++) { // old i
                        let posx = x * 48;
                        if (y % 2 == 0) {
                            posx += 24;
                        }
                        CnvCtx.drawImage(HEXTILES_IMAGE, tileMap.tile[y][x].coordImg.x, tileMap.tile[y][x].coordImg.y, 32, 52, posx, 14 * y, 32, 52);
                    }
                }
            });
    }

}
// ** Init
document.addEventListener('DOMContentLoaded', () => {

    View.canvasContainer = document.getElementById('drawing-container');
    View.canvasElement = document.getElementById("drawing-area");
    View.columnField = document.getElementById('columns');
    View.rowField = document.getElementById('row');
    View.simplexFrequency = document.getElementById('frequency');


    document.getElementById('generate').addEventListener('click', View.onUpdateGenerate.bind(View));
    document.getElementById('row').addEventListener('change', View.onUpdateRowNumber.bind(View));
    document.getElementById('columns').addEventListener('change', View.onUpdateColumnsNumber.bind(View));
    document.getElementById('zoom').addEventListener('input', View.onUpdateZoomSlider.bind(View));
    document.getElementById('frequency').addEventListener('change', View.onFrequrncyUpdate.bind(View));

    MainController.init(View.rowField.value, View.columnField.value);

});

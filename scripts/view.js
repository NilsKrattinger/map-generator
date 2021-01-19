const View = {
// ** Refs
    canvasContainer: undefined,
    canvasElement: undefined,

    rowField: undefined,
    columnField: undefined,

    generateButton: undefined,

    canvasZoomSlider: undefined,

    elevationFrequencySlider: undefined,

    ileCheckBox : undefined,
    ileSize : undefined,
    ileLitCheckBox : undefined,

    townCheckBox : undefined,



    onUpdateGenerate() {
        Controller.generate().catch(r => alert("Erreur lors de l'execution" + r));

    },

    onUpdateParam() {
        Controller.changeNbRow(this.rowField.value);
        Controller.changeNbColumn(this.columnField.value);
        Controller.changeFrequency(this.elevationFrequencySlider.value);
        Controller.changeIle(this.ileCheckBox.checked);
        Controller.changeIleSize(this.ileSize.value);
        Controller.changeTowns(this.townCheckBox.checked);
        Controller.changeIleLito(this.ileLitCheckBox.checked);
        Controller.generate().catch(r => alert("Erreur lors de l'execution" + r));

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
                CnvCtx.scale(0.5, 0.5);
                for (let y = 0; y < tileMap.nbRows; y++) {
                    for (let x = 0; x < tileMap.nbColumns; x++) {
                        let posx = x * 48;
                        if (y % 2 == 0) {
                            posx += 24;
                        }
                        CnvCtx.drawImage(HEXTILES_IMAGE, utils.getPointOnImage(tileMap.result.tile[y][x]).x, utils.getPointOnImage(tileMap.result.tile[y][x]).y, 32, 48, posx, 14 * y, 32, 48);
                    }
                }

                CnvCtx.scale(2, 2);
            });
    }

}
// ** Init
document.addEventListener('DOMContentLoaded', () => {

    View.canvasContainer = document.getElementById('drawing-container');
    View.canvasElement = document.getElementById("drawing-area");
    View.columnField = document.getElementById('columns');
    View.rowField = document.getElementById('row');
    View.elevationFrequencySlider = document.getElementById('frequency');
    View.ileCheckBox = document.getElementById('ileCheckBox');
    View.ileSize = document.getElementById('ileSize');
    View.ileLitCheckBox = document.getElementById('lito');
    View.townCheckBox = document.getElementById('villes');


    document.getElementById('generate').addEventListener('click', View.onUpdateGenerate.bind(View));
    document.getElementById('row').addEventListener('change', View.onUpdateParam.bind(View));
    document.getElementById('columns').addEventListener('change', View.onUpdateParam.bind(View));
    document.getElementById('zoom').addEventListener('input', View.onUpdateParam.bind(View));
    document.getElementById('frequency').addEventListener("input", View.onUpdateParam.bind(View));
    document.getElementById('ileCheckBox').addEventListener('change', View.onUpdateParam.bind(View));
    document.getElementById('ileSize').addEventListener('change', View.onUpdateParam.bind(View));
    document.getElementById('lito').addEventListener('change', View.onUpdateParam.bind(View));
    document.getElementById('villes').addEventListener('change', View.onUpdateParam.bind(View));



    Controller.init(View.rowField.value, View.columnField.value, View.elevationFrequencySlider.value);
});

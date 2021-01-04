const View = {
    // ** Refs
    canvasContainer: undefined,

}
// Init
document.addEventListener('DOMContentLoaded', () => {

    View.canvasContainer = document.getElementById('drawing-container');
    View.canvasElement = document.getElementById("drawing-area");


    Controller.draw();

});
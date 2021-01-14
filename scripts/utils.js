graph();

function graph() {
    var canvas = document.getElementById("myCanvas");
    var theContext = canvas.getContext("2d");
    var sales = [52, 48, 74, 31, 47, 25, 67, 78, 45, 15, 85];
    var width = 300;
    var height = 100;
    var uSpacing = 10;
    var border = 20;
    var scalar = 100;

    theContext.strokeRect(border, border, width, height)
    theContext.beginPath();
    theContext.moveTo(100,100);
    theContext.lineTo(52,48);
    theContext.stroke();
}

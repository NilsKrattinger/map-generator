const Controller = {
    draw() {
        var canvas = document.getElementById('drawing-area');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(100, 100, 500, 500);

            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(300, 300, 500, 500);
        }
    }
};
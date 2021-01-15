const utils = {
    getPointOnImage(point) {
        console.log(point)
        let realPoint = new Point((point.y-1) * 32, (point.x-1) *48)
        console.log(realPoint)
        return realPoint;
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
}

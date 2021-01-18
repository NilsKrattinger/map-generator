const utils = {
    getPointOnImage(point) {
        let realPoint = new Point((point.y-1) * 32, (point.x-1) *48)
        return realPoint;
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
}

const utils = {
    getPointOnImage(point) {
        let realPoint = new Point((point.y-1) * 32, (point.x-1) *48)
        return realPoint;
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    neighour(point){
        if (point.y%2 == 0){
            voisins = [new Point(point.x,point.y-2),new Point(point.x,point.y-1),new Point(point.x,point.y+1),new Point(point.x,point.y+2),new Point(point.x+1,point.y-1),new Point(point.x+1,point.y+1)]
        }else{
            voisins = [new Point(point.x,point.y-2),new Point(point.x,point.y-1),new Point(point.x,point.y+1),new Point(point.x,point.y+2),new Point(point.x-1,point.y-1),new Point(point.x-1,point.y+1)]
        }
    return voisins;
    }
}

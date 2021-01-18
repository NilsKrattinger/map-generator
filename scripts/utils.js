const utils = {
    getPointOnImage(point) {
        let realPoint = new Point((point.y-1) * 32, (point.x-1) *48)
        return realPoint;
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    neighbour(point,maxX, maxY){
        let neighbour = [];
        let neighbourProba;

        let neighbourMathCoPaire = [{"x":0 , "y" : -2},{"x" : 0, "y" : -1},{"x" : 0, "y" : 1},{"x" : 0, "y" : 2},{"x" : 1, "y" : -1},{"x" : 1, "y" : -1}];
        let neighbourMathCoImpaire = [{"x" : 0 , "y" : -2},{"x" : 0, "y" : -1},{"x" : 0, "y" : 1},{"x" : 0, "y" : 2},{"x" : -1, "y" : 1},{"x" : -1, "y" : -1}];
        for(let i = 0; i < neighbourMathCoPaire.length; i++ ){
            if (point.y%2 == 0) {
                neighbourProba = new Point(point.x + neighbourMathCoPaire[i].x, point.y + neighbourMathCoPaire[i].y);
            } else {
                neighbourProba = new Point(point.x + neighbourMathCoImpaire[i].x, point.y + neighbourMathCoImpaire[i].y);
            }

            if(! (neighbourProba.y < 0 || neighbourProba.x < 0 || neighbourProba.x >= maxX || neighbourProba.y >= maxY )){
                neighbour.push(new Point(neighbourProba.x,neighbourProba.y));
            }
        }

    return neighbour;
    },

    avgArray(array,layer){

        let somme = 0;

        for (let i = 0; i < array.length; i++) {

            somme = somme + layer[array[i].x][array[i].y];
        }
        return somme / array.length;
    },
}

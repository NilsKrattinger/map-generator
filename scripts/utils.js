// ** Permet la supression dans un Array
if (!Array.prototype.remove) {
    Array.prototype.remove = function (from, to) {
        let rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}


const utils = {
    // ** Transpose les coordonée tuiles, en coordonées pixel
    tileToPixel(point) {
        return new Point((point.y - 1) * 32, (point.x - 1) * 48);
    },

    // ** Return an number between 0 and max
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    tileToPixelOnCanvas(point){
        let posx = point.y * 48;
        if (point.x % 2 === 0) {
            posx += 24;
        }
        let posy = point.x * 14;

        return new Point(posx,posy);
    },

    // ** Return the center of an hexagon
    getHexCenter(point) {
        return new Point(point.x + 16, point.y + 30);
    },

    // ** Return all of neighbors between 0 and the max
    neighbors(point, maxX, maxY) {
        let neighborsArray = [];
        let potentialNeighbors;
        let neighbors = [];

        if (point.x % 2 == 0) {
            neighbors = [new Point(point.x - 1, point.y), new Point(point.x + 1, point.y), new Point(point.x + 2, point.y), new Point(point.x + 1, point.y + 1), new Point(point.x - 1, point.y + 1), new Point(point.x - 2, point.y)];
        } else {
            if (point.y % 2 == 0) {
                neighbors = [new Point(point.x - 1, point.y - 1), new Point(point.x + 1, point.y - 1), new Point(point.x - 2, point.y), new Point(point.x + 1, point.y), new Point(point.x - 1, point.y), new Point(point.x + 2, point.y)];
            } else {
                neighbors = [new Point(point.x - 1, point.y - 1), new Point(point.x + 1, point.y - 1), new Point(point.x + 2, point.y), new Point(point.x + 1, point.y), new Point(point.x - 1, point.y), new Point(point.x - 2, point.y)];

            }
        }

        for (let j = 0; j < neighbors.length; j++) {
            potentialNeighbors = neighbors[j];
            if (!(potentialNeighbors.y < 0 || potentialNeighbors.x < 0 || potentialNeighbors.x >= maxX || potentialNeighbors.y >= maxY)) {
                neighborsArray.push(new Point(potentialNeighbors.x, potentialNeighbors.y));
            }
        }
        return neighborsArray;
    },

    // Retourne la moyenne des valeurs d'un layer au position contenue dans le array
    avgArray(array, layer) {

        let somme = 0;

        for (let i = 0; i < array.length; i++) {

            somme = somme + layer[array[i].x][array[i].y];
        }
        return somme / array.length;
    },

    // Retourne la distance entre deux point avec la distance de X / Rand(10) // utilisé dans la generation des formes d'iles
    distancePointByRand(p1, p2) {
        return Math.sqrt((Math.pow(p2.x - p1.x, 2)) / utils.getRandomInt(10) +
            Math.pow(p2.y - p1.y, 2) * 1.0);
    },

    // Retourne la distance entre deux points
    distancePoint(p1, p2) {
        return Math.sqrt((Math.pow(p2.x - p1.x, 2)) +
            Math.pow(p2.y - p1.y, 2) * 1.0);
    },
};


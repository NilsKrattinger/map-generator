if (!Array.prototype.remove) {
    Array.prototype.remove = function (from, to) {
        let rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}

const utils = {
    getPointOnImage(point) {
        let realPoint = new Point((point.y - 1) * 32, (point.x - 1) * 48)
        return realPoint;
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    getHexCenter(point) {
        return new Point(point.x + 16, point.y + 30);
    },

    neighbour(point, maxX, maxY) {
        let neighbour = [];
        let neighbourProba;
        let voisins;

        if (point.x % 2 == 0) {
            voisins = [new Point(point.x - 1, point.y), new Point(point.x + 1, point.y), new Point(point.x + 2, point.y), new Point(point.x + 1, point.y + 1), new Point(point.x - 1, point.y + 1), new Point(point.x - 2, point.y)];
        } else {
            if (point.y % 2 == 0) {
                voisins = [new Point(point.x - 1, point.y - 1), new Point(point.x + 1, point.y - 1), new Point(point.x - 2, point.y), new Point(point.x + 1, point.y), new Point(point.x - 1, point.y), new Point(point.x + 2, point.y)];
            } else {
                voisins = [new Point(point.x - 1, point.y - 1), new Point(point.x + 1, point.y - 1), new Point(point.x + 2, point.y), new Point(point.x + 1, point.y), new Point(point.x - 1, point.y), new Point(point.x - 2, point.y)];

            }
        }

        for (let j = 0; j < voisins.length; j++) {
            neighbourProba = voisins[j];
            if (!(neighbourProba.y < 0 || neighbourProba.x < 0 || neighbourProba.x >= maxX || neighbourProba.y >= maxY)) {
                neighbour.push(new Point(neighbourProba.x, neighbourProba.y));
            }
        }
        return neighbour;
    },

    avgArray(array, layer) {

        let somme = 0;

        for (let i = 0; i < array.length; i++) {

            somme = somme + layer[array[i].x][array[i].y];
        }
        return somme / array.length;
    },

    distancePointByRand(p1, p2) {
        return Math.sqrt((Math.pow(p2.x - p1.x, 2)) / utils.getRandomInt(10) +
            Math.pow(p2.y - p1.y, 2) * 1.0);
    },

    distancePoint(p1, p2) {
        return Math.sqrt((Math.pow(p2.x - p1.x, 2)) +
            Math.pow(p2.y - p1.y, 2) * 1.0);
    },
};


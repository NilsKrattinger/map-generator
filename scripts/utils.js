if (!Array.prototype.remove) {
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
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

    distanceManhattan(p1, p2) {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;

        let dist;
        if (Math.sign(dx) == Math.sign(dy)) {
            dist = Math.abs(dx + dy);
        } else {
            dist = Math.max(Math.abs(dx), Math.abs(dy))
        }

        return dist;


        // return
        //Math.sqrt((Math.pow(p2.x - p1.x, 2)) / utils.getRandomInt(10) +
        //    Math.pow(p2.y - p1.y, 2) * 1.0);
    },


    pathfinder(data,p1,p2) {


        for (var x = 0; x < data.nbRows; x++) {
            for (var y = 0; y < data.nbColumns; y++) {
                data.result.pathfinding[x][y] = new Object();
                data.result.pathfinding[x][y].f = 0;
                data.result.pathfinding[x][y].g = 0;
                data.result.pathfinding[x][y].h = 0;
                data.result.pathfinding[x][y].content = 1;
                data.result.pathfinding[x][y].point = new Point (x,y);

                data.result.pathfinding[x][y].visted = false;
                data.result.pathfinding[x][y].closed = false;
                data.result.pathfinding[x][y].debug = "";
                data.result.pathfinding[x][y].parent = null;
            }
        }


        let openList = [];
        let start = data.result.pathfinding[p1.x][p1.y];
        let end = data.result.pathfinding[p2.x][p2.y];

        openList.push(start);

        while (openList.length > 0) {
            let lowInd = 0;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[lowInd].f) {
                    lowInd = i;
                }
            }
            let currentNode = openList[lowInd];

            if (currentNode == end) {
                let curr = currentNode;
                let ret = [];
                while (curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                ret.push(start);
                console.log("test",ret.reverse());
                return ret.reverse();
            }

            openList.remove(lowInd);
            currentNode.closed = true;

            let neighbors = this.neighbour(currentNode.point,data.nbRows-1,data.nbRows-1);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = data.result.pathfinding[neighbors[i].x][neighbors[i].y];
                console.log(data.result.pathfinding[neighbors[i].x][neighbors[i].y],neighbors[i]);

                console.log("n" , neighbor);
                let biom = data.result.biome[neighbors[i].x][neighbors[i].y];
                if (neighbor.closed || biom == BiomEnum.Sea || biom == BiomEnum.litoral) { // not a valid node to process, skip to next neighbor
                    continue;
                }

                let gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                let gScoreIsBest = false;

                if (!neighbor.visited) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet
                    gScoreIsBest = true;
                    neighbor.h = this.distancePoint(neighbor.point, end.point);
                    neighbor.visited = true;
                    openList.push(neighbor);
                } else if (gScore < neighbor.g) {
                    // We have already seen the node, but last time it had a worse g (distance from start)
                    gScoreIsBest = true;
                }
                if (gScoreIsBest) {
                    // Found an optimal (so far) path to this node.  Store info on how we got here and just how good it really is. ////
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
                }

            }


        }
        console.log("oupsi");

        return [];
    }
};


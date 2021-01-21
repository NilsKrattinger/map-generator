const RivierMaker = {
    waterFinder(data, origine) {
        let list = [];
        let tuileAjouter = new Set()
        let water = undefined;

        list.push(origine)
        while (list.length > 0 && water == undefined) {
            let openTile = list[0];
            let openTileBiom = data.result.biome[openTile.x][openTile.y];

            if (openTileBiom == BiomEnum.Sea || openTileBiom == BiomEnum.litoral) {
                water = openTile;
            } else {
                let voisin = utils.neighbors(openTile, data.rowNumber, data.columnsNumber);
                let distanceOpenTile = utils.distancePoint(openTile, origine);
                for (let i = 0; i < voisin.length; i++) {
                    if (utils.distancePoint(voisin[i], origine) > distanceOpenTile) {
                        if (!tuileAjouter.has(voisin[i].x + ":" + voisin[i].y)) {
                            list.push(voisin[i]);
                            tuileAjouter.add(voisin[i].x + ":" + voisin[i].y);
                        }
                    }
                }
                list = list.slice(1);
            }

        }
        return water;
    },


    pathfinderForRivier(data, p1, p2) {

        //Reset des objets du pathFinder
        for (let x = 0; x < data.rowNumber; x++) {
            for (let y = 0; y < data.columnsNumber; y++) {
                data.result.usedInRiver[x][y] = new Object();
                data.result.usedInRiver[x][y].f = 0;
                data.result.usedInRiver[x][y].g = 0;
                data.result.usedInRiver[x][y].h = 0;
                data.result.usedInRiver[x][y].content = 1;
                data.result.usedInRiver[x][y].point = new Point(x, y);

                data.result.usedInRiver[x][y].visted = false;
                data.result.usedInRiver[x][y].closed = false;
                data.result.usedInRiver[x][y].parent = null;
            }
        }

        let openList = [];

        let start = data.result.usedInRiver[p1.x][p1.y];
        let end = data.result.usedInRiver[p2.x][p2.y];

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
                    data.result.usedInRiver[curr.point.x][curr.point.y] = 1;
                    ret.push(curr);
                    curr = curr.parent;
                }
                ret.push(start);
                return ret.reverse();
            }

            openList.remove(lowInd);
            currentNode.closed = true;

            let neighbors = utils.neighbors(currentNode.point, data.rowNumber - 1, data.columnsNumber - 1);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = data.result.usedInRiver[neighbors[i].x][neighbors[i].y];

                let biom = data.result.biome[neighbors[i].x][neighbors[i].y];
                if (neighbor.closed || biom == BiomEnum.Desert || biom == BiomEnum.Savanne) { // not a valid node to process, skip to next neighbor
                    continue;
                }


                //defined the G by bioms
                //if the tiles is already used in path cost should be 0 for visual rendering

                let tileCost = 0;

                if (data.result.usedInRiver[currentNode.point.x][currentNode.point.y] != 1 || biom == BiomEnum.litoral ) {
                    if (data.result.elevation[currentNode.point.x][currentNode.point.y] <= 1.5) {
                        tileCost = 20;
                    } else if (data.result.elevation[currentNode.point.x][currentNode.point.y] <= 2) {
                        tileCost = 4;
                    } else {
                        tileCost = 3;
                    }


                }

                let gScore = currentNode.g + tileCost; // 1 is the distance from a node to it's neighbor
                let gScoreIsBest = false;

                if (!neighbor.visited) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet
                    gScoreIsBest = true;
                    neighbor.h = utils.distancePoint(neighbor.point, end.point);
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
                }

            }


        }
        return [];
    }
};
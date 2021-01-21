const pathFinder = {
    pathfinder(data, p1, p2) {

        //Reset des objets du pathFinder
        for (let x = 0; x < data.rowNumber; x++) {
            for (let y = 0; y < data.columnsNumber; y++) {
                data.result.pathFinding[x][y] = new Object();
                data.result.pathFinding[x][y].f = 0;
                data.result.pathFinding[x][y].g = 0;
                data.result.pathFinding[x][y].h = 0;
                data.result.pathFinding[x][y].content = 1;
                data.result.pathFinding[x][y].point = new Point(x, y);

                data.result.pathFinding[x][y].visted = false;
                data.result.pathFinding[x][y].closed = false;
                data.result.pathFinding[x][y].parent = null;
            }
        }

        let openList = [];

        let start = data.result.pathFinding[p1.x][p1.y];
        let end = data.result.pathFinding[p2.x][p2.y];

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
                    data.result.usedInPath[curr.point.x][curr.point.y] = 1;
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
                let neighbor = data.result.pathFinding[neighbors[i].x][neighbors[i].y];

                let biom = data.result.biome[neighbors[i].x][neighbors[i].y];
                if (neighbor.closed || biom == BiomEnum.Sea || biom == BiomEnum.Littoral) { // not a valid node to process, skip to next neighbor
                    continue;
                }


                //defined the G by bioms
                //if the tiles is already used in path cost should be 0 for visual rendering

                let tileCost = 0;

                if (data.result.usedInPath[currentNode.point.x][currentNode.point.y] != 1) {
                    if (data.result.elevation[currentNode.point.x][currentNode.point.y] <= 1.5) {
                        tileCost = 9;
                    } else if (data.result.elevation[currentNode.point.x][currentNode.point.y] <= 2) {
                        tileCost = 5;
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
        ("oupsi");

        return [];
    }
}
function Point(x, y) {
    this.x = x;
    this.y = y;
    return this;
}

function Tile(point, proba) {
    this.point = point;
    this.proba = proba;
    return this;
}

const BiomEnum = Object.freeze({"Snow": 1, "Plaine": 2, "Savanne": 3, "Desert": 4, "Sea": 5, "litoral" : 6,"beach" : 7});
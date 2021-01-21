function Point(x, y) {
    this.x = x;
    this.y = y;
    return this;
}

const BiomEnum = Object.freeze({"Snow": 1, "Meadow": 2, "Savanna": 3, "Desert": 4, "Sea": 5, "Littoral" : 6,"Beach" : 7});
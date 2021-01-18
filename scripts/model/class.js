function Point(x,y){
    this.x = x;
    this.y = y;
    return this;
}

const BiomEnum = Object.freeze({"Snow":1, "Plaine":2, "Savanne":3, "Desert" : 4,"Jungle":5});
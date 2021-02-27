class SnakeSegment {

    constructor(type, x, y) {
        this.type = type;
        this.coordinates = {
            x: x,
            y: y,
        };

        this.Image = document.createElement("img");
        this.Image.src = "C:/Users/wwwku/source/repos/Snake/" + type + ".png";
        this.Image.style.position = "absolute";
        this.Image.style.left = this.coordinates.x.toString() + "px";
        this.Image.style.top = this.coordinates.y.toString() + "px";
        document.body.appendChild(this.Image);
    };

    setPosition(xcoord, ycoord) {
        this.coordinates = {
            x: xcoord,
            y: ycoord,
        };
        this.Image.style.left = this.coordinates.x.toString() + "px";
        this.Image.style.top = this.coordinates.y.toString() + "px";
    };

    setType(SegmentType) {
        this.type = SegmentType;
        this.Image.src = "C:/Users/wwwku/source/repos/Snake/" + this.type + ".png";

    }

    getPosition() {
        return this.coordinates;
    }

}





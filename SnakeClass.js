class SnakeSegment {

    constructor(type, x, y,rotation) {
        this.type = type;
        this.coordinates = {
            x: x,
            y: y,
        };
        
        this.rotation = rotation;
        
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
        this.Image.style.transform = "rotate(" + this.rotation + "deg)";

        
    };

    setType(SegmentType) {
        this.type = SegmentType;
        this.Image.src = "C:/Users/wwwku/source/repos/Snake/" + this.type + ".png";
        
    }

    getPosition() {
        return this.coordinates;
    }

    setRotation(RotationDeg) {
        this.rotation = RotationDeg;
    }

    getRotation() {
        return this.rotation;
    }

}





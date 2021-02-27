class SnakeSegment {
    constructor(type) {
        this.type = type.toString();
        var coordinates = {
            x: (Math.floor(Math.random() * 150) + 10).toString(),
            y: (Math.floor(Math.random() * 679) + 10).toString(),
        };
        var Image = document.createElement("img");
        Image.src = "C:/Users/wwwku/source/repos/Snake/"+this.type+".png";
        Image.style.position = "absolute";
        Image.style.left = coordinates.x.toString() + "px";
        Image.style.top = coordinates.y.toString() + "px";
        document.body.appendChild(Image);
    }
}



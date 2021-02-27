class Apple {
    constructor(){
        var width = document.body.clientWidth - 40;
        var height = document.documentElement.clientHeight - 40;
        var coordinates = {
            x:(Math.floor(Math.random() * width) + 10).toString(),
            y:(Math.floor(Math.random() * height) - 10).toString(),
        };
        var Appleimg = document.createElement("img");
        Appleimg.src = "C:/Users/wwwku/source/repos/Snake/Apple.png";
        Appleimg.style.position = "absolute";
        Appleimg.style.left = (coordinates.x + "px");
        Appleimg.style.top = (coordinates.y + "px");
        document.body.appendChild(Appleimg);
    }
}


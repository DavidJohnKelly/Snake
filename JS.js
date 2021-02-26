function GenerateApple() {
    var width = document.body.clientWidth - 40;
    var height = document.documentElement.clientHeight - 40;
    const coordinates = [(Math.floor(Math.random() * width)).toString(), (Math.floor(Math.random() * height)).toString()];
    var Appleimg = document.createElement("img");
    Appleimg.src = "C:/Users/wwwku/source/repos/Snake/Apple.png";

    Appleimg.style.position = "absolute";
    Appleimg.style.left = ((coordinates[0] + "px"));
    Appleimg.style.top = ((coordinates[1]+ "px"));
    document.body.appendChild(Appleimg);

}
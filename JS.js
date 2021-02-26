function GenerateApple(){
    var Appleimg = document.createElement("img");
    Appleimg.src = "C:/Users/wwwku/source/repos/Snake/Apple.png";
    document.getElementById("PlayableArea").appendChild(Appleimg);
    document.getElementById("StartButton").style.visibility = "hidden";
}
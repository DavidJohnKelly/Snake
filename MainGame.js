var Snake = [];
var AppleList = [];
function GameStart() {
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";

    Snake[0] = new SnakeSegment("head", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2, 0);
    Snake[1] = new SnakeSegment("body", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2 - 45, 0);
    Snake[2] = new SnakeSegment("body", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2 - 90, 0);
    Snake[3] = new SnakeSegment("body", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2 - 90-45, 0);
    Snake[4] = new SnakeSegment("tail", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2 - 90-45, 0);

    GameLoop()
}

function GameLoop() {

    var Dead = 0
    const snakeloop = setInterval(function(){
        if(Dead) { return clearInterval(snakeloop) }
        else{
            Movement();
            
        }
    }, 200) // New Snake movement every 0.2 seconds (5 fps)

    window.onkeypress = function (press) {
        if (press.keyCode == 97) {
            //Left
            if (Snake[0].getRotation() !== -90) {
                Snake[0].setRotation(90);
            }
        };
        if (press.keyCode == 119) {
            //Up
            if (Snake[0].getRotation() !== 0) {
                Snake[0].setRotation(180);
            }
        };
        if (press.keyCode == 100) {
            //Right
            if (Snake[0].getRotation() !== 90) {
                Snake[0].setRotation(-90);
            }
        };
        if (press.keyCode == 115) {
            //Down
            if (Snake[0].getRotation() !== 180) {
                Snake[0].setRotation(0);
            }
        };
    };

    const appleloop = setInterval(function () {
        if (Dead) { return clearInterval(appleloop) }
        else {
            SpawnApple();

        };
    }, 5000) // Apple spawns every 5 seconds

}


function AddSegment() {
    Snake[Snake.length - 1].setType("body");
    var PreviousCoordinates = Snake[Snake.length - 1].getPosition();
    Snake[Snake.length] = new SnakeSegment("tail", PreviousCoordinates.x, PreviousCoordinates.y - 46);

}



function Movement() {

    var HeadRotation = Snake[0].getRotation();
    var HeadPosition = Snake[0].getPosition();
    if (HeadRotation == 90) {
        Snake[0].setPosition(HeadPosition.x-45, HeadPosition.y); // Increments the position of the head of the snake left
    };
    if (HeadRotation == 180) {
        Snake[0].setPosition(HeadPosition.x, HeadPosition.y - 45); // Increments the position of the head of the snake down
    };
    if (HeadRotation == -90) {
        Snake[0].setPosition(HeadPosition.x+45, HeadPosition.y); // Increments the position of the head of the snake right
    };
    if (HeadRotation == 0) {
        Snake[0].setPosition(HeadPosition.x, HeadPosition.y + 45); // Increments the position of the head of the snake up
    };

    Snake[Snake.length - 1].setPosition(HeadPosition.x, HeadPosition.y); // Moves the tail piece to where the head was
    Snake[Snake.length - 1].setType("body"); // Alters the tail piece to become a body segment
    Snake.splice(1, 0, Snake[Snake.length - 1]); // Adds the altered tail piece in the list between the head and first body connection
    Snake.splice(Snake.length - 1, 1); // Deletes the initial tail piece from the list
    Snake[Snake.length - 1].setType("tail"); // Alters the now final item in the list (body) to be a tail
    
    
}

function SpawnApple() {
    if (AppleList.length = 0) {
        AppleList[0] = new Apple;
    } else {
        AppleList[AppleList.length - 1] = new Apple;
    }
}



var Snake = [];
var Apple_Location_Dictionary = { // O(1) coordinate lookup!

};
var Snake_Location_Dictionary = { // O(1) coordinate lookup!

};
var Score = 0;
var Dead = 0

function GameStart() {
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";
    //Using grid system of 45 x 45 px
    Snake[0] = new SnakeSegment(Math.round(((document.documentElement.clientWidth) / 2) / 45) * 45, Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45, "down"); // Head can't collide with itself so no need to add to dictionary
    Snake[1] = new SnakeSegment(Math.round(((document.documentElement.clientWidth) / 2) / 45) * 45, Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45 - 45, "down");
    Snake_Location_Dictionary[(Math.round(((document.documentElement.clientWidth) / 2) / 45) * 45).toString() + ":" + (Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45 - 45).toString()] = 1;
    Snake[2] = new SnakeSegment(Math.round(((document.documentElement.clientWidth) / 2) / 45) * 45, Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45 - 90, "down");
    Snake_Location_Dictionary[(Math.round(((document.documentElement.clientWidth) / 2) / 45) * 45).toString() + ":" + (Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45 - 90).toString()] = 1;
    GameLoop()
}

function GameLoop() {

    const snakeloop = setInterval(function () {
        if (Dead) {
            alert("You died! Score: " + Score.toString());
            clearInterval(snakeloop);
            window.location.reload();
        } else {
            Movement();

        }
    }, 200) // New Snake movement every 0.2 seconds (5 fps)

    window.onkeypress = function (press) {
        if (press.keyCode == 97) {
            //Left
            if (Snake[0].getDirection() !== "right") {
                Snake[0].setDirection("left");
            }

        };

        if (press.keyCode == 119) {
            //Up
            if (Snake[0].getDirection() !== "down") {
                Snake[0].setDirection("up");

            }
        };

        if (press.keyCode == 100) {
            //Right
            if (Snake[0].getDirection() !== "left") {
                Snake[0].setDirection("right");

            }
        };

        if (press.keyCode == 115) {
            //Down
            if (Snake[0].getDirection() !== "up") {
                Snake[0].setDirection("down");

            }
        };
    };

    const appleloop = setInterval(function () {
        if (Dead) {
            return clearInterval(appleloop)
        } else {
            SpawnApple();

        };
    }, 5000) // Apple spawns every 5 seconds

}

function AddSegment() { //Adds a new body segment to the snake
    var SnakeTailDirection = Snake[Snake.length - 1].getDirection();
    var PreviousCoordinates = Snake[Snake.length - 1].getPosition();
    if (SnakeTailDirection == "up") {
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x, PreviousCoordinates.y + 45, SnakeTailDirection);
        Snake_Location_Dictionary[PreviousCoordinates.x + ":" + (PreviousCoordinates.y + 45).toString()] = 1;
    }
    else if (SnakeTailDirection == "left") {
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x + 45, PreviousCoordinates.y, SnakeTailDirection);
        Snake_Location_Dictionary[(PreviousCoordinates.x + 45).toString() + ":" + (PreviousCoordinates.y).toString()] = 1;

    }
    else if (SnakeTailDirection == "right"){
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x - 45, PreviousCoordinates.y, SnakeTailDirection);
        Snake_Location_Dictionary[(PreviousCoordinates.x - 45).toString() + ":" + (PreviousCoordinates.y).toString()] = 1;

    }
    else if (SnakeTailDirection == "down") {
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x, PreviousCoordinates.y - 45, SnakeTailDirection);
        Snake_Location_Dictionary[(PreviousCoordinates.x) + ":" + (PreviousCoordinates.y - 45).toString()] = 1;

    }
}

function Movement() {


    var HeadDirection = Snake[0].getDirection();
    var HeadPosition = Snake[0].getPosition();
    var TailPosition = Snake[Snake.length - 1].getPosition();
    Snake.splice(1, 0, Snake[Snake.length - 1]); // Adds the altered tail piece in the list between the head and first body connection
    Snake[1].setDirection(HeadDirection);
    Snake[1].setPosition(HeadPosition.x, HeadPosition.y); // Moves the tail piece to where the head was
    Snake.splice(Snake.length - 1, 1); // Deletes the initial tail piece from the list
    delete Snake_Location_Dictionary[TailPosition.x + ":" + TailPosition.y]; // Removes the location of the tail from the location dictionary
    Snake_Location_Dictionary[HeadPosition.x + ":" + HeadPosition.y] = 1; // Updates the dictionary with the new location of the tail piece

    if (HeadDirection == "up") {
        Snake[0].setPosition(HeadPosition.x, HeadPosition.y - 45); // Increments the position of the head of the snake up
    };
    if (HeadDirection == "left") {
        Snake[0].setPosition(HeadPosition.x - 45, HeadPosition.y); // Increments the position of the head of the snake left
    };

    if (HeadDirection == "right") {
        Snake[0].setPosition(HeadPosition.x + 45, HeadPosition.y); // Increments the position of the head of the snake right

    };
    if (HeadDirection == "down") {
        Snake[0].setPosition(HeadPosition.x, HeadPosition.y + 45); // Increments the position of the head of the snake down

    };
    HeadPosition = Snake[0].getPosition() // Gets the new head position and checks it against the location of the body segments.
    if (typeof Snake_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()] !== "undefined") {
        Dead = 1;
    }

    //Checks for collisions between snake and apples
    if (typeof Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()] !== "undefined") {
        Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()].eaten();
        delete Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()];
        document.getElementById("Score").innerHTML = "Score: " + Score.toString();
        AddSegment();
    }

}

//Spawns an Apple at a random coordinate and adds it to the dictionary object.
function SpawnApple() {
    var width = document.body.clientWidth - 40;
    var height = document.documentElement.clientHeight - 40;
    var xcoord = (Math.round((Math.floor(Math.random() * width) + 10) / 45) * 45);
    var ycoord = (Math.round((Math.floor(Math.random() * height) - 10) / 45) * 45);
    var ApplePosition = {
        x: xcoord.toString(),
        y: ycoord.toString(),
    };
    Apple_Location_Dictionary[ApplePosition.x + ":" + ApplePosition.y] = new Apple(ApplePosition.x, ApplePosition.y);
}
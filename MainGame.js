//Using multiple local copies of the width and height variables to allow for window resizing
var Snakes = [[]]; // 1st row holds player snake, 2nd row holds AI snake
var Apple_Location_Dictionary = { // O(1) coordinate lookup!

};
var Snake_Location_Dictionary = { // O(1) coordinate lookup!

};
var Score = 0;
var Dead = 0

function GameStart() {

    document.documentElement.style.overflow = "hidden"; //Disables the scroll bars
    document.body.scroll = "no";
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";

    const appleloop = setInterval(function () {
        if (Dead) {
            return clearInterval(appleloop)
        } else {
            SpawnApple();

        };
    }, 5000); // Apple spawns every 5 seconds

    //Starts the player input
    PlayerGameLoop();

    //Starts the AI
    AIGameLoop();
}

function PlayerGameLoop() {
    //Using grid system of 45 x 45 px
    var width = Math.round(((document.documentElement.clientWidth) / 5) / 45) * 45; //Player start coordinates
    var height = Math.round(((document.documentElement.scrollHeight) / 5) / 45) * 45;

    //Initialises the player controlled snake
    Snakes[0][0] = new SnakeSegment(width, height, "down", "Player"); // Head can't collide with itself so no need to add to dictionary
    Snakes[0][1] = new SnakeSegment(width, height - 45, "down", "Player");
    Snake_Location_Dictionary[width.toString() + ":" + (height - 45).toString()] = 1;
    Snakes[0][2] = new SnakeSegment(width, height - 90, "down", "Player");
    Snake_Location_Dictionary[width.toString() + ":" + (height - 90).toString()] = 1;

    const snakeloop = setInterval(function () {
        if (Dead) {
            alert("You died! Score: " + Score.toString());
            clearInterval(snakeloop);
            window.location.reload();
        } else {
            Movement(0);

        }
    }, 200) // New Snake movement every 0.2 seconds (5 fps)

    document.addEventListener("keydown", function (press) {
        var SnakeDirection = Snakes[0][0].getDirection();
        var KeyPressed = press.code;

        if (KeyPressed == "KeyA" && SnakeDirection !=="right") {
            //Left
            Snakes[0][0].setDirection("left");
        };

        if (KeyPressed == "KeyW" && SnakeDirection !== "down") {
            //Up
            Snakes[0][0].setDirection("up");
        };

        if (KeyPressed == "KeyD" && SnakeDirection !== "left") {
            //Right
            Snakes[0][0].setDirection("right");
        };

        if (KeyPressed == "KeyS" && SnakeDirection !== "up") {
            //Down
            Snakes[0][0].setDirection("down");
        };
    });

}

function AIGameLoop() {
    //Using grid system of 45 x 45 px
    var width = Math.round(((document.documentElement.clientWidth) / 1.25) / 45) * 45 //Player start coordinates
    var height = Math.round(((document.documentElement.scrollHeight) / 1.25) / 45) * 45

    //Initialises the player controlled snake
    Snakes[1] = [];
    Snakes[1][0] = new SnakeSegment(width, height, "down", "AI"); // Head can't collide with itself so no need to add to dictionary
    Snakes[1][1] = new SnakeSegment(width, height - 45, "down", "AI");
    Snake_Location_Dictionary[width.toString() + ":" + (height - 45).toString()] = 1;
    Snakes[1][2] = new SnakeSegment(width, height - 90, "down", "AI");
    Snake_Location_Dictionary[width.toString() + ":" + (height - 90).toString()] = 1;

    const snakeloop = setInterval(function () {
        if (Object.keys(Apple_Location_Dictionary).length > 0) {
            var AISnakeHead = Snakes[1][0];
            var AISnakeHeadPosition = AISnakeHead.getPosition();
            var AppleObject = Object.values(Apple_Location_Dictionary)[0];

            var ApplePosition = AppleObject.getPosition();
            if (AISnakeHeadPosition.x < ApplePosition.x) {
                AISnakeHead.setDirection("right");
            }
            else if (AISnakeHeadPosition.x > ApplePosition.x) {
                AISnakeHead.setDirection("left");

            }
            else if (AISnakeHeadPosition.y > ApplePosition.y) {
                AISnakeHead.setDirection("up");

            }
            else if (AISnakeHeadPosition.y < ApplePosition.y) {
                AISnakeHead.setDirection("down");

            }
            
        };
        Movement(1);
    }, 200); // New Snake movement every 0.2 seconds (5 fps)

}

function AddSegment(SnakeNum) { //Adds a new body segment to a specified snake
    var type = "";
    if (SnakeNum == 0) {
        type = "Player";
    } else {
        type = "AI";
    }

    var SnakeTailDirection = Snakes[SnakeNum][Snakes[SnakeNum].length - 1].getDirection();
    var PreviousCoordinates = Snakes[SnakeNum][Snakes[SnakeNum].length - 1].getPosition();
    if (SnakeTailDirection == "up") { //Adds the new segment below the tail piece
        Snakes[SnakeNum][Snakes[SnakeNum].length] = new SnakeSegment(PreviousCoordinates.x, PreviousCoordinates.y + 45, SnakeTailDirection, type);
        Snake_Location_Dictionary[PreviousCoordinates.x + ":" + (PreviousCoordinates.y + 45).toString()] = 1;
    } else if (SnakeTailDirection == "left") { //Adds the new segment to the right of the tail piece
        Snakes[SnakeNum][Snakes[SnakeNum].length] = new SnakeSegment(PreviousCoordinates.x + 45, PreviousCoordinates.y, SnakeTailDirection, type);
        Snake_Location_Dictionary[(PreviousCoordinates.x + 45).toString() + ":" + (PreviousCoordinates.y).toString()] = 1;

    } else if (SnakeTailDirection == "right") { //Adds the new segment to the left of the tail piece
        Snakes[SnakeNum][Snakes[SnakeNum].length] = new SnakeSegment(PreviousCoordinates.x - 45, PreviousCoordinates.y, SnakeTailDirection, type);
        Snake_Location_Dictionary[(PreviousCoordinates.x - 45).toString() + ":" + (PreviousCoordinates.y).toString()] = 1;

    } else if (SnakeTailDirection == "down") { //Adds the new segment above the tail piece
        Snakes[SnakeNum][Snakes[SnakeNum].length] = new SnakeSegment(PreviousCoordinates.x, PreviousCoordinates.y - 45, SnakeTailDirection, type);
        Snake_Location_Dictionary[(PreviousCoordinates.x) + ":" + (PreviousCoordinates.y - 45).toString()] = 1;

    }
}

function Movement(SnakeNum) {

    var width = Math.round(document.body.clientWidth / 45) * 45;
    var height = Math.round(document.documentElement.clientHeight / 45) * 45;

    var HeadDirection = Snakes[SnakeNum][0].getDirection();
    var HeadPosition = Snakes[SnakeNum][0].getPosition();
    var TailPosition = Snakes[SnakeNum][Snakes[SnakeNum].length - 1].getPosition();
    Snakes[SnakeNum].splice(1, 0, Snakes[SnakeNum][Snakes[SnakeNum].length - 1]); // Adds the altered tail piece in the list between the head and first body connection
    Snakes[SnakeNum][1].setDirection(HeadDirection);
    Snakes[SnakeNum][1].setPosition(HeadPosition.x, HeadPosition.y); // Moves the tail piece to where the head was
    Snakes[SnakeNum].splice(Snakes[SnakeNum].length - 1, 1); // Deletes the initial tail piece from the list
    delete Snake_Location_Dictionary[TailPosition.x + ":" + TailPosition.y]; // Removes the location of the tail from the location dictionary
    Snake_Location_Dictionary[HeadPosition.x + ":" + HeadPosition.y] = 1; // Updates the dictionary with the new location of the tail piece

    if (HeadDirection == "up") {
        Snakes[SnakeNum][0].setPosition(HeadPosition.x, HeadPosition.y - 45); // Increments the position of the head of the snake up
        HeadPosition = Snakes[SnakeNum][0].getPosition();

        if (HeadPosition.y < 0) { //Checks if segment is off screen, loops on other side if it is
            Snakes[SnakeNum][0].setPosition(HeadPosition.x, height);
        }
    };
    if (HeadDirection == "left") {
        Snakes[SnakeNum][0].setPosition(HeadPosition.x - 45, HeadPosition.y); // Increments the position of the head of the snake left
        HeadPosition = Snakes[SnakeNum][0].getPosition();
        if (HeadPosition.x < 0) { //Checks if segment is off screen, loops on other side if it is
            Snakes[SnakeNum][0].setPosition(width, HeadPosition.y);
        }
    };

    if (HeadDirection == "right") {
        Snakes[SnakeNum][0].setPosition(HeadPosition.x + 45, HeadPosition.y); // Increments the position of the head of the snake right
        HeadPosition = Snakes[SnakeNum][0].getPosition();
        if (HeadPosition.x > width) { //Checks if segment is off screen, loops on other side if it is
            Snakes[SnakeNum][0].setPosition(0, HeadPosition.y);
        }
    };
    if (HeadDirection == "down") {
        Snakes[SnakeNum][0].setPosition(HeadPosition.x, HeadPosition.y + 45); // Increments the position of the head of the snake down
        HeadPosition = Snakes[SnakeNum][0].getPosition()
        if (HeadPosition.y > height) { //Checks if segment is off screen, loops on other side if it is
            Snakes[SnakeNum][0].setPosition(HeadPosition.x, 0);
        }
    };

    // Checks the new head position against the locations of the body segments.
    if (typeof Snake_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()] !== "undefined") {
        if (SnakeNum == 0) {
            Dead = 1; //Collision between segments so game is over
        }
        else { //Otherwise, removes the AI Snake from the gameboard
            var x = 0;
            for (x; x < Snakes[1].length; x++) {
                var AILocation = Snakes[1][x].getPosition();
                delete Snake_Location_Dictionary[AILocation.x + ":" + AILocation.y];
                Snakes[1][x].remove();
            }
        }
        
    }

    //Checks for collisions between snake and apples
    if (typeof Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()] !== "undefined") {
        Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()].eaten();
        delete Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()];
        AddSegment(SnakeNum);
        if (SnakeNum == 0) {
            Score++;
            document.getElementById("Score").innerHTML = "Score: " + Score.toString();
        }

    }

}

//Spawns an Apple at a random coordinate and adds it to the dictionary object.
function SpawnApple() {
    var width = document.body.clientWidth - 50; //-50 to stop it spawning out of bounds
    var height = document.documentElement.clientHeight - 50; //-50 to stop it spawning out of bounds
    var Valid = 0

    do {
        var xcoord = (Math.round((Math.floor(Math.random() * width)) / 45) * 45);
        var ycoord = (Math.round((Math.floor(Math.random() * height)) / 45) * 45);
        if (typeof Apple_Location_Dictionary[xcoord.toString() + ":" + ycoord.toString()] === "undefined" && typeof Snake_Location_Dictionary[xcoord.toString() + ":" + ycoord.toString()] === "undefined") {
            Valid = 1;
            var ApplePosition = {
                x: xcoord.toString(),
                y: ycoord.toString(),
            };
            Apple_Location_Dictionary[ApplePosition.x + ":" + ApplePosition.y] = new Apple(ApplePosition.x, ApplePosition.y);
        }
    } while (Valid = 0);
}
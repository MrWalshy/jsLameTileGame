var gameCanvas = document.querySelector("#gameCanvas");
// context stores the 2D rendering context, the tool used to paint
// on the canvas
var context = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

// Map
var map = {
    cols: 8,
    rows: 8,
    tSizeX: gameCanvas.width / 8,
    tSizeY: gameCanvas.height / 8,
    tileAmount: this.rows * this.cols,
    tiles: [
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 2, 0, 0, 0, 0, 0, 1,
        1, 2, 0, 0, 0, 0, 0, 1,
        1, 2, 0, 0, 0, 0, 0, 1,
        1, 2, 2, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1
    ],

    playerOnTile: [3][4], // [row][column]

    getTile: function(col, row){
        return this.tiles[row * map.cols + col];
    },
    getTileCoordMap: function(){
        var tileCoords = [];
        var temp;

        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                temp = [row * this.tSizeY, col * this.tSizeX];

                tileCoords.push(temp);
            }
        }
        console.log(tileCoords); // Format [x, y]
    }
};

function Player(){
    // Player size
    this.width = 50;
    this.height = 50;
    
    // Movement speed (any value is ok)
    this.speed = 7;
    
    // Player position Start
    this.x = gameCanvas.width / 2;
    this.y = gameCanvas.height - 200;

    this.drawPlayer = function(){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "blue";
        context.fill();
        context.closePath();
    };

    this.move = function(moveX, moveY){
        // Move the player, then resolve collisions
        // Borders
        const left = map.tSizeX;
        const top = map.tSizeY;
        const right = gameCanvas.width - map.tSizeX - this.width;
        const bottom = gameCanvas.height - map.tSizeY - this.height;

        this.x += moveX;
        this.y += moveY;
        
        // Collision Detection (Resets player position if hitting the boundary)
        if(this.x < left) {this.x = left}
        else if(this.x > right) {this.x = right}

        if(this.y < top) {this.y = top}
        else if(this.y > bottom) {this.y = bottom}
    };

    this.currentLocation = function(){
        console.log(this.x, this.y);
    };
}

var newPlayer = new Player();

// Keypress
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Keypress handlers
// 'e' represents event
function keyDownHandler(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    } else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }

    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    } else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }

    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

function drawMap(){
    for(var r = 0; r < map.rows; r++){
        for(var c = 0; c < map.cols; c++){
            var tile = map.getTile(c, r);

            if(tile == 1){
                context.fillStyle = "#000000";
                // 0 * map.tSizeX... 1 * map.tSizeX
                context.fillRect(c * map.tSizeX, r * map.tSizeY, map.tSizeX, map.tSizeY);
            } else if(tile == 2){
                context.fillStyle = "#8B4513";
                context.fillRect(c * map.tSizeX, r * map.tSizeY, map.tSizeX, map.tSizeY);
            }
        }
    }
}

function draw(){
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    
    drawMap();
    newPlayer.drawPlayer();

    if(upPressed){
        newPlayer.move(0, -newPlayer.speed);
    } else if(downPressed){
        newPlayer.move(0, newPlayer.speed);
    } else if(leftPressed){
        newPlayer.move(-newPlayer.speed, 0);
    } else if(rightPressed){
        newPlayer.move(newPlayer.speed, 0);
    }

    requestAnimationFrame(draw);
}
map.getTileCoordMap();
newPlayer.currentLocation();
draw();
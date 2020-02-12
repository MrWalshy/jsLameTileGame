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
    getTile: function(col, row){
        return this.tiles[row * map.cols + col];
    },
    getTileCoords: function(){
        
    }
};

function Player(){
    this.width = 50;
    this.height = 50;

    this.x = gameCanvas.width / 2;
    this.y = gameCanvas.height - 200;

    this.setPosition = function(x, y){
        this.x = x;
        this.y = y;
    };

    this.drawPlayer = function(){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "blue";
        context.fill();
        context.closePath();
    };
    
    this.moveUp = function(){
        this.y -= 7;
    };

    this.moveDown = function(){
        this.y += 7;
    };

    this.moveLeft = function(){
        this.x -= 7;
    };

    this.moveRight = function(){
        this.x += 7;
    }
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
        newPlayer.moveUp();
    } else if(downPressed){
        newPlayer.moveDown();
    } else if(leftPressed){
        newPlayer.moveLeft();
    } else if(rightPressed){
        newPlayer.moveRight();
    }

    requestAnimationFrame(draw);
}

draw();
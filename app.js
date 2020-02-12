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
    }
};

// Starting point for player
var x = gameCanvas.width / 2;
var y = gameCanvas.height - 200;

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

function drawPlayer(){
    context.beginPath();
    context.rect(x, y, 50, 10);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}

function draw(){
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    
    drawMap();
    drawPlayer();

    if(upPressed){
        y -= 7;
    } else if(downPressed){
        y += 7;
    } else if(leftPressed){
        x -= 7;
    } else if(rightPressed){
        x += 7;
    }

    requestAnimationFrame(draw);
}

draw();
console.log("arkanoid")

var canvas, canvasContext;

//DOM function will be called right after loading html file
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, "white");

    loadImages();
}

function imageLoadingDoneSoStartGame() {
    var framePerSecond = 30;
    //refreshing 30 times per second
    setInterval(updateAll, 1000 / framePerSecond);

    setupInput();
    carReset();
}

function carReset() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COL; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if (trackGrid[arrayIndex] == TRACK_PLAYER_START) {
                trackGrid[arrayIndex] = TRACK_ROAD;
                carAngle = -90 * Math.PI/180;
                carX = eachCol * TRACK_W + TRACK_W / 2;
                carY = eachRow * TRACK_H + TRACK_H / 2;
            }
        }
    }
}

//function which update the status (refreshing)
function updateAll() {
    moveAll();
    drawAll();
}

function carMove() {
    carSpeed *= GROUND_SPEED_DECAY_MULT;

    if(keyHeld_Gas){
        carSpeed +=DRIVE_POWER;
    }
    if(keyHeld_Reverse){
        carSpeed -=REVERSE_POWER;
    }
    if(keyHeld_TurnLeft){
        carAngle -=TURN_RATE;
    }
    if(keyHeld_TurnRight){
        carAngle +=TURN_RATE;
    }

    carX += Math.cos(carAngle) * carSpeed;
    carY += Math.sin(carAngle) * carSpeed;
   // carSpeed += -0.5;
}

function moveAll() {
    carMove();
    carTrackHandling();
}

function rowColToArrayIndex(col, row) {
    return col + TRACK_COL * row;
}

function drawAll() {
    drawTracks();
    carDraw();
}
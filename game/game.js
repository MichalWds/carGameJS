console.log("arkanoid")

var canvas, canvasContext;

var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carSpeed = 2;
var carAngle = 0;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COL = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas= false;
var keyHeld_Reverse= false;  //break
var keyHeld_TurnLeft= false;  //break
var keyHeld_TurnRight= false;  //break


var mouseX = 0;
var mouseY = 0;

//DOM function will be called right after loading html file
window.onload = function () {
    var framePerSecond = 30;
    canvas = document.getElementById('gameCanvas');

    canvasContext = canvas.getContext('2d');
    //refreshing 30 times per second
    setInterval(updateAll, 1000 / framePerSecond);

    canvas.addEventListener('mousemove', updateMousePosition);

    //document not canvas because we are on the document
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    carPic.onload = function () {
        carPicLoaded = true;
    }

    carPic.src = "player1car.png";
    carReset();
}


function keyPressed(event) {
    if (event.keyCode == KEY_LEFT_ARROW) {
        carAngle -= 0.5;
    }
    if (event.keyCode == KEY_RIGHT_ARROW) {
        carAngle += 0.5;
    }
    if (event.keyCode == KEY_UP_ARROW) {
        carSpeed += 0.5;
    }
    if (event.keyCode == KEY_DOWN_ARROW) {
        carSpeed -= 0.5;
    }
    //  console.log("pres" + event.keyCode);
    event.preventDefault();
}

function keyReleased(event) {

   // console.log("rel" + event.keyCode);

}

function updateMousePosition(event) {
    //gives actual position on the page
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;

    //cheat to test
    /** carX = mouseX;
     carY = mouseY;
     carSpeedX = 4;
     carSpeedY = -4;
     **/
}

function carReset() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COL; eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if (trackGrid[arrayIndex] == 2) {
                trackGrid[arrayIndex] = 0;
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
    carX += Math.cos(carAngle) * carSpeed;
    carY += Math.sin(carAngle) * carSpeed;

 //   carAngle += 0.02;
}

function isTrackAtColRow(col, row) {

    if (col >= 0 && col < TRACK_COL &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] == 1);
    } else {
        return false;
    }
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W); //math floor count tracks row/col
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    //check if it is not negative, to avoid bugs like disappearing track from another side of frame
    if (isTrackAtColRow(carTrackCol, carTrackRow) >= 0 && carTrackCol
        < TRACK_COL && carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

        if (isTrackAtColRow(carTrackCol, carTrackRow)) {
            carSpeed *= -1;
        } //end of track found
    }  //end valid col and row
}


function moveAll() {
    carMove();
    carTrackHandling();
}

function rowColToArrayIndex(col, row) {
    return col + TRACK_COL * row;
}

function drawTracks() {

    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COL; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if (trackGrid[arrayIndex] == 1) {
                colorRectangle(TRACK_W * eachCol, TRACK_H * eachRow, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
            } //end of is this track here
        }
    } //end of for each track
} //end of drawTrack function

function drawAll() {
    colorRectangle(0, 0, canvas.width, canvas.height, 'black'); //clear screen
    // colorCircle(carX, carY, 10, 0, 'red');   //draw car
    if (carPicLoaded) {
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAngle);
    }
    drawTracks();
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
    canvasContext.restore();
}


function colorRectangle(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight,);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = 'red';
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, fillColor, Math.PI * 2, true);
    canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}
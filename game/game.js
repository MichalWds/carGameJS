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

//function which update the status (refreshing)
function updateAll() {
    moveAll();
    drawAll();
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
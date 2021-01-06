var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    colorRectangle(0,0, canvas.width,canvas.height, 'black');
    colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

    loadImages();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();
    blueCar.reset(blueCarPic);
    greenCar.reset(greenCarPic);
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
}

function drawAll() {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
} 
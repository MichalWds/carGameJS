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

    loadLevel(levelOne);
    loadLevel(levelTwo);
}
function loadLevel(whichLevel) {
    trackGrid=whichLevel.slice();//slice do a copy by value one part of array to some part of another. slice(34)
    // for example slice without any value inside will copy values since 0 to end of the array
    blueCar.reset(blueCarPic, "Blue Storm");
    greenCar.reset(greenCarPic, "Green Machine");
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
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

const KEY_UP_W= 87;
const KEY_RIGHT_D = 68;
const KEY_DOWN_S = 83;
const KEY_LEFT_A = 65;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePosition);
    //document not canvas because we are on the document
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    greenCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
    blueCar.setupInput(KEY_UP_W, KEY_RIGHT_D, KEY_DOWN_S, KEY_LEFT_A);
}

function keySet(keyEvent, whichCar, setTo) {

    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeld_TurnRight = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeld_Gas = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeld_Reverse =setTo;
    }
}

function keyPressed(event) {
    console.log(event.keyCode);
    keySet(event,greenCar,true);
    keySet(event,blueCar,true);
  }

function keyReleased(event) {

    keySet(event,greenCar,false);
    keySet(event, blueCar,false);
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
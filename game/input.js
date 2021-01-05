const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var keyHeld_Gas= false;
var keyHeld_Reverse= false;  //break
var keyHeld_TurnLeft= false;
var keyHeld_TurnRight= false;

const GROUND_SPEED_DECAY_MULT =0.94;
const DRIVE_POWER =0.5;
const REVERSE_POWER =0.2;
const TURN_RATE =0.03;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePosition);
    //document not canvas because we are on the document
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
}

function keyPressed(event) {
    if (event.keyCode == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = true;
    }
    if (event.keyCode == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = true;
    }
    if (event.keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = true;
    }
    if (event.keyCode == KEY_DOWN_ARROW) {
        keyHeld_Reverse =true;
    }
    //  console.log("pres" + event.keyCode);
    event.preventDefault();
}

function keyReleased(event) {

    if (event.keyCode == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = false;
    }
    if (event.keyCode == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = false;
    }
    if (event.keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = false;
    }
    if (event.keyCode == KEY_DOWN_ARROW) {
        keyHeld_Reverse =false;
    }
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
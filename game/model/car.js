var carX = 75;
var carY = 75;
var carSpeed = 0;
var carAngle = 0;

const GROUND_SPEED_DECAY_MULT =0.94;
const DRIVE_POWER =0.5;
const REVERSE_POWER =0.2;
const TURN_RATE =0.07;
const MIN_SPEED_TO_TURN =0.5;

function carDraw() {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAngle);
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

function carMove() {
    carSpeed *= GROUND_SPEED_DECAY_MULT;

    if(keyHeld_Gas){
        carSpeed +=DRIVE_POWER;
    }
    if(keyHeld_Reverse){
        carSpeed -=REVERSE_POWER;
    }
    if(Math.abs(carSpeed) > MIN_SPEED_TO_TURN) {
        if (keyHeld_TurnLeft) {
            carAngle -= TURN_RATE;
        }
        if (keyHeld_TurnRight) {
            carAngle += TURN_RATE;
        }
    }
    carX += Math.cos(carAngle) * carSpeed;
    carY += Math.sin(carAngle) * carSpeed;
    // carSpeed += -0.5;
}

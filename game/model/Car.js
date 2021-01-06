const GROUND_SPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {

    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.myCarPic; //which picture to use


    this.reset = function(whichImage) {
        this.myCarPic = whichImage;

        for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
            for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                if(trackGrid[arrayIndex] == TRACK_PLAYER_START) {
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    this.ang = -Math.PI/2;
                    this.x = eachCol * TRACK_W + TRACK_W/2;
                    this.y = eachRow * TRACK_H + TRACK_H/2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
    } // end of carReset func

    this.move = function() {
        this.speed *= GROUND_SPEED_DECAY_MULT;

        if(keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if(keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            if(keyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }
            if(keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        carTrackHandling(this);
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myCarPic, this.x,this.y, this.ang);
    }
}

// finish the function and check next place if car is there
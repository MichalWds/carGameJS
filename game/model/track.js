const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COL = 20;
const TRACK_ROWS = 15;

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

const TRACK_ROAD=0;
const TRACK_WALL=1;
const TRACK_PLAYER_START=2;

function wallImageLoad() {
}

function isWallAtColRow(col, row) {

    if (col >= 0 && col < TRACK_COL &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] == TRACK_WALL);
    } else {
        return false;
    }
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W); //math floor count tracks row/col
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    //check if it is not negative, to avoid bugs like disappearing track from another side of frame
    if (isWallAtColRow(carTrackCol, carTrackRow) >= 0 && carTrackCol
        < TRACK_COL && carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

        if (isWallAtColRow(carTrackCol, carTrackRow)) {
            carX -= Math.cos(carAngle) * carSpeed;
            carY -= Math.sin(carAngle) * carSpeed;

            carSpeed *= -0.5;
        } //end of track found
    }  //end valid col and row
}

function drawTracks() {

    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COL; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if (trackGrid[arrayIndex] == TRACK_ROAD) {
                canvasContext.drawImage(roadPic, TRACK_W * eachCol, TRACK_H * eachRow);
            } else if (trackGrid[arrayIndex] == TRACK_WALL) {
                canvasContext.drawImage(wallPic, TRACK_W * eachCol, TRACK_H * eachRow);
            }
        }
    } //end of for each track
} //end of drawTrack function

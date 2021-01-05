const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COL = 20;
const TRACK_ROWS = 15;

var trackGrid = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

//obstacle as : przeszkoda
function isObstacleColRow(col, row) {

    if (col >= 0 && col < TRACK_COL &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
    } else {
        return false;
    }
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W); //math floor count tracks row/col
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    //check if it is not negative, to avoid bugs like disappearing track from another side of frame
    if (isObstacleColRow(carTrackCol, carTrackRow) >= 0 && carTrackCol
        < TRACK_COL && carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

        if (isObstacleColRow(carTrackCol, carTrackRow)) {
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
            //rodzaj podloza
            var tileKindHere = trackGrid[arrayIndex];
            var useImg;

            switch (tileKindHere) {
                case TRACK_ROAD:
                    useImg = roadPic;
                    break;
                case TRACK_WALL:
                    useImg = wallPic;
                    break;
                case TRACK_GOAL:
                    useImg = goalPic;
                    break;
                case TRACK_TREE:
                    useImg = treePic;
                    break;
                case TRACK_FLAG:
                    useImg = flagPic;
                    break;
            }
            canvasContext.drawImage(useImg, TRACK_W * eachCol, TRACK_H * eachRow);
        }
    } //end of for each track
} //end of drawTrack function

var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    // Build the tile array as dive then add to the board element
    for (let r = 0; r < rows; r++) {
        let row = [];

        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }

        board.push(row);
    }
 }

 function setPiece() {
    // is board full
    checkBoardFull();

    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //"0-0" -> ["0", "0"]
    let x = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    let r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    // take turns
    if (currPlayer == playerRed){
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
         tile.classList.add("yellow-piece");
         currPlayer = playerRed;
     }

    // update row height array
    r -= 1;
    currColumns[c] = r;

    //checkWinner();
    checkWinner2(x, c);
 }

 // this is the default algorithm to check for a win.
 // it searches the entire board after every move.
 /*function checkWinner() {
    // horizontally
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1]
                    && board[r][c + 1] == board[r][c + 2]
                    && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
     }

     // vertically
     for (let c = 0; c < columns; c++) {
         for (let r = 0; r < rows - 3; r++) {
             if (board[r][c] != ' ') {
                 if (board[r][c] == board[r + 1][c]
                     && board[r + 1][c] == board[r + 2][c]
                     && board[r + 2][c] == board[r + 3][c]) {
                     setWinner(r, c);
                     return;
                 }
             }
         }
     }

     // reverse diagonal
     for (let r = 0; r < rows - 3; r++) {
         for (let c = 0; c < columns - 3; c++) {
             if (board[r][c] != ' ') {
                 if (board[r][c] == board[r + 1][c + 1]
                     && board[r + 1][c + 1] == board[r + 2][c + 2]
                     && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                     setWinner(r, c);
                     return;
                 }
             }
         }
     }

     // diagonal
     for (let r = 3; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++) {
             if (board[r][c] != ' ') {
                 if (board[r][c] == board[r - 1][c + 1]
                     && board[r - 1][c + 1] == board[r - 2][c + 2]
                     && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                     setWinner(r, c);
                     return;
                 }
             }
         }
     }
 }*/

// my new algorithm that searches possible wins starting from the tile played.
// does not search for vertical wins until at least 4 tiles are stacked.
// vertical search only checks 4 tiles below current tile.
// uses string functions to find 4 tiles in a row.
function checkWinner2(r, c) {
    let x = r;
    let y = c;
    let test = '';

    // vertical check
    if (x < 3
        && board[x][y] == board[x + 1][y]
        && board[x + 1][y] == board[x + 2][y]
        && board[x + 2][y] == board[x + 3][y]) {
        setWinner(r, c);
        return;
    }

    // horizontal check
    for (let y = (c - 3); y <= (c + 3); y++) {
        if (y > -1 && y < columns) {
            test += board[x][y];
        }
    }

    // check for 4 in a row
    if (test.indexOf("RRRR") >= 0) {
        setWinner(r, c);
        return;
    } else if (test.indexOf("YYYY") >= 0) {
        setWinner(r, c);
        return;
    }

    test = '';

    // reverse diagonal check
    x = r - 3;
    y = c - 3;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r - 2;
    y = c - 2;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r - 1;
    y = c - 1;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r;
    y = c;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r + 1;
    y = c + 1;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r + 2;
    y = c + 2;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r + 3;
    y = c + 3;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    // check for 4 in a row
    if (test.indexOf("RRRR") >= 0) {
        setWinner(r, c);
        return;
    } else if (test.indexOf("YYYY") >= 0) {
        setWinner(r, c);
        return;
    }

    test = '';

    // diagonal check
    x = r + 3;
    y = c - 3;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r + 2;
    y = c - 2;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r + 1;
    y = c - 1;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r;
    y = c;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r - 1;
    y = c + 1;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r - 2;
    y = c + 2;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    x = r - 3;
    y = c + 3;
    if ((y > -1 && y < columns) && (x > -1 && x < rows)) {
        test += board[x][y];
    }

    // check for 4 in a row
    if (test.indexOf("RRRR") >= 0) {
        setWinner(r, c);
        return;
    } else if (test.indexOf("YYYY") >= 0) {
        setWinner(r, c);
        return;
    }
}

 function setWinner(r, c) {
    let winner = document.getElementById("winner");

    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }

    gameOver = true;
 }

function checkBoardFull() {
    let winner = document.getElementById("winner");

    // end game if all columns full
    if (currColumns[0] < 0
        && currColumns[1] < 0
        && currColumns[2] < 0
        && currColumns[3] < 0
        && currColumns[4] < 0
        && currColumns[5] < 0
        && currColumns[6] < 0) {
        winner.innerText = "Tie Game";
        gameOver = true;
    }
}

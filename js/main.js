// Get some elements that will be necessary
const boardContainer = document.querySelector('#board-container');
let msg = document.querySelector('#msg');
let pieces = document.querySelectorAll('#piece');

// Board related variables
let board = [];
const BOARD_LENGTH = 9;

window.onload = function() {
    // Create the board pieces
    createBoardPieces();
    
    // Listen for a click on the board pieces
    pieces.forEach(piece => piece.addEventListener('click', handleClick));
}

function createBoardPieces() {
    for(let i = 0; i < BOARD_LENGTH; i++) {
        board[i] = {
            // Connect the array with the elements on the screen through the index
            index: i,
            content: '',
            occupied: false
        };
    }
}

function handleClick(e) {
    const pieceElement = e.target;
    const boardPiece = board[this.dataset.index];

    // Check if the piece is available, if it is, place the 'X' there
    // If it isn't warn the player
    if(isPieceAvailable(boardPiece)) {
        // Update the object
        boardPiece.content = 'X';
        boardPiece.occupied = true;
        // Display on screen
        pieceElement.innerHTML = 'X';
    } else {
        console.log('Place is taken. Choose again');
    }

    // Check end of the game
    if(isGameOver()) {
        return;
    }

    // Computer move
    computerMove();

    // Check end of the game
    if(isGameOver()) {
        return;
    }
}

function computerMove() {
    // Choose a random place
    const place = randomRange(1,9);
    const boardPiece = board[place-1];
    const pieceElement = pieces[place-1];
    
    // Check if that place is occupied
    if(isPieceAvailable(boardPiece)) {
        // Update the object
        boardPiece.content = 'O';
        boardPiece.occupied = true;
        // Display on the screen
        pieceElement.innerHTML = 'O';
    } else {
        computerMove();
    }
    
    // When all places are taken need to stop the computer move
}

function isGameOver() {
    // Check if someone completed a row
    for(let i = 0; i < 9; i += 3) {
        if(board[i].content == board[i+1].content && board[i].content == board[i+2].content && board[i].content != '') {
            boardContainer.style.display = 'none';
            msg.innerHTML = 'Row won';
            console.log('Row complete');
            return true;
        }
    }

    // Check if someone completed a column
    for(let i = 0; i < 3; i++) {
        if(board[i].content == board[i+3].content && board[i].content == board[i+6].content && board[i].content != '') {
            boardContainer.style.display = 'none';
            msg.innerHTML = 'Column won';
            console.log('Column complete');
            return true;
        }
    }

    // Check if someone completed a diagonal
    if( (board[0].content == board[4].content && board[0].content == board[8].content && board[0].content != '') || (board[2].content == board[4].content && board[2].content == board[6].content && board[2].content != '') ) {
        boardContainer.style.display = 'none';
        msg.innerHTML = 'Diagonal won';
        console.log('Diagonal complete');
        return true;
    }

    // If there's one empty place, the game is not over yet
    for(let i = 0; i < BOARD_LENGTH; i++) {
        if(board[i].content == '') {
            return false;
        }
    }

    // All places are taken and no one won(all the tests above failed) - tie
    boardContainer.style.display = 'none';
    msg.innerHTML = 'GAME OVER!';
    return true;
} 

function isPieceAvailable(piece) {
    return piece.occupied == false ? true : false;
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let vsAI = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const statusDisplay = document.getElementById('status');

function handleMove(cellIndex) {
    if (!gameActive || board[cellIndex] !== '') return;

    board[cellIndex] = currentPlayer;
    document.getElementsByClassName('cell')[cellIndex].textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        statusDisplay.textContent = `${currentPlayer} wins!`;
        animateWin();
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (vsAI && currentPlayer === 'O') {
        makeAIMove();
    }
}

function checkWin() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = '';
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.textContent = '';
    }
}

function animateWin() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        cells[a].classList.add('win');
        cells[b].classList.add('win');
        cells[c].classList.add('win');
    }
}

function makeAIMove() {
    // Simple AI logic: choose the first available empty cell
    const emptyCells = board.reduce((acc, curr, index) => {
        if (curr === '') acc.push(index);
        return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleMove(emptyCells[randomIndex]);
}

function toggleAI() {
    vsAI = !vsAI;
    resetGame();
}

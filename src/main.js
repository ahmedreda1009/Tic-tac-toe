let playerXMoves = [];
let playerOMoves = [];
let history = [];
let currentPlayer = 'X';
let movesCounter = 0;
let winner = false;

let winCases = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];


let squares = document.querySelectorAll('.board .square');
let movesDivs = document.querySelectorAll('.moves .moves-block button');
let winnerPlyer = document.querySelector('.info .winner span');
let nextPlayerField = document.querySelector('.info .next-player span');
let moves = document.querySelector('.moves .moves-block');



function isPlayerWon(arr) {
    let winArra = [];

    let result = winCases.some((element) => {
        let res = element.every((ele) => {
            return arr.includes(ele);
        });
        winArra = element;
        return res;
    });

    if (result) {
        squares.forEach((ele) => {
            if (winArra.includes(+ele.dataset.id)) {
                ele.classList.add('text-warning');
            }
        });
        nextPlayerField.textContent = '...';
    }

    return result;
}

function CheckWinner(clickedSquare) {
    if (clickedSquare.textContent || winner) return;
    clickedSquare.textContent = currentPlayer;

    if (currentPlayer === 'X') {
        playerXMoves.push(+clickedSquare.dataset.id);
        // currentPlayer = 'O';
        winner = isPlayerWon(playerXMoves);

        if (winner) {
            winnerPlyer.textContent = 'X';
        } else {
            currentPlayer = 'O';
            nextPlayerField.textContent = currentPlayer;
        }
    } else {
        playerOMoves.push(+clickedSquare.dataset.id);
        // currentPlayer = 'X';
        winner = isPlayerWon(playerOMoves);

        if (winner) {
            winnerPlyer.textContent = 'O';
        } else {
            currentPlayer = 'X';
            nextPlayerField.textContent = currentPlayer;
        }
    }

    let hisObj = {
        x: [...playerXMoves],
        o: [...playerOMoves],
        next: nextPlayerField.textContent,
        winnerP: winnerPlyer.textContent
    };

    history.push(hisObj);

    let moveBlock = document.createElement('button');
    let moveText = document.createTextNode(`Go to move #${movesCounter + 1}`)
    moveBlock.classList = 'btn btn-primary d-block mb-2';
    moveBlock.dataset.id = movesCounter + 1;

    moveBlock.addEventListener('click', (e) => {
        displayHistory(history[e.target.dataset.id - 1]);
    });

    moveBlock.append(moveText);
    moves.append(moveBlock);

    moves.append(moveBlock);

    movesCounter++;
}

function displayHistory(historyObj) {
    nextPlayerField.textContent = historyObj.next;
    winnerPlyer.textContent = historyObj.winnerP;
    squares.forEach(ele => {
        if (historyObj.x.includes(+ele.dataset.id)) {
            ele.textContent = 'X';
        } else if (historyObj.o.includes(+ele.dataset.id)) {
            ele.textContent = 'O';
        } else {
            ele.textContent = '';
        }
    });
}

squares.forEach(ele => {
    ele.addEventListener('click', () => {
        CheckWinner(ele);
    });
});

document.getElementById('play-again').addEventListener('click', () => {
    playerXMoves = [];
    playerOMoves = [];
    history = [];
    currentPlayer = 'X';
    movesCounter = 0;
    winner = false;
    squares.forEach(ele => {
        ele.textContent = '';
        ele.classList.remove('text-warning');
    });
    moves.innerHTML = '';
    nextPlayerField.textContent = currentPlayer;
    winnerPlyer.textContent = '...';
});
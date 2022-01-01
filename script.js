let winningScreen = document.querySelector(".winning-screen");
let winningMessage = document.querySelector(".winning-message");
let restartButton = document.querySelector(".restart");
let playerButton = document.querySelector(".player");
let cpuButton = document.querySelector(".cpu");
let backButton = document.querySelector(".back")
let body = document.querySelector("body");
let buttonContainer = document.querySelector(".button-container");
let id = 0;


let movesCount = 0;

let player1Rows = [0, 0, 0];
let player2Rows = [0, 0, 0];
let player1Col = [0, 0, 0];
let player2Col = [0, 0, 0];
let player1Diag = 0;
let player2Diag = 0;
let player1ADiag = 0;
let player2ADiag = 0;

//wyłaczanie przycisków, właczam je dopiero 1000ms po tym jak zaczna stawac sie widoczne
restartButton.disabled = true;
backButton.disabled = true;


//table dla CPU 

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];


const GameBoard = (function () {


    const makeVisable = () => {
        winningScreen.style.visibility = "visible";
        winningScreen.style.opacity = "100%";
        winningMessage.style.opacity = "100%";
        setTimeout(() => {
            restartButton.disabled = false;
            backButton.disabled = false;
        }, 1000);
    }

    playerButton.addEventListener('click', () => {
        printGameBoard();
        resetGame();
        buttonContainer.style.visibility = "hidden";
        //main player vs player game code
        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click', () => {
                if (movesCount % 2 == 0 && !item.classList.contains("checked") && !item.classList.contains("checked2")) {
                    movesCount++;
                    item.classList.add("checked2");
                    if (player1Move(item.dataset.row, item.dataset.column) == 1) {
                        winningMessage.textContent = "Player 1 Won";
                        makeVisable();
                    }
                }
                if (movesCount % 2 != 0 && !item.classList.contains("checked") && !item.classList.contains("checked2")) {
                    movesCount++;
                    item.classList.add("checked");
                    if (player2Move(item.dataset.row, item.dataset.column) == 1) {
                        winningMessage.textContent = "Player 2 Won";
                        makeVisable();
                    }
                }

                if (movesCount == 9 && winningMessage.textContent == "") {
                    winningMessage.textContent = "Draw";
                    winningScreen.style.visibility = "visible";
                    makeVisable();
                }

            })
        })

    });

    // --------------------RESET---------------------
    restartButton.addEventListener('click', () => {
        if (!restartButton.disabled) GameBoard.resetGame();
    });

    // -------------------BACK----------------------
    backButton.addEventListener('click', () => {
        if (!backButton.disabled) {
            buttonContainer.style.display = "flex";
            document.querySelector(".container").remove();
            winningScreen.style.opacity = "0%";
            winningScreen.style.visibility = "hidden";
            buttonContainer.style.visibility = "visible";

        }
    });



    cpuButton.addEventListener('click', () => {
        printGameBoard();
        resetGame();
        // cala mechaniku cpu
        
        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains("checked") && !item.classList.contains("checked2")) {
                    item.classList.add("checked2");
                    board[item.dataset.id] = null;
                    if (player1Move(item.dataset.row, item.dataset.column) == 1) {
                        winningMessage.textContent = "Player 1 Won";
                        makeVisable();
                    }
                    else{
                        var indexes = Array.from(Array(board.length).keys());
                        var availableIndexes = indexes.filter((index) => board[index] != null);
                        var selectedIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

                        board[selectedIndex] = null;
                        selectedItem = document.querySelector(`[data-id='${selectedIndex}']`);
                        selectedItem.classList.add("checked");

                        if (player2Move(selectedItem.dataset.row, selectedItem.dataset.column) == 1) {
                            winningMessage.textContent = "Player 2 Won";
                            makeVisable();
                        }

                        console.log(availableIndexes);
                        console.log(selectedIndex);
                    }
                    }



                if (movesCount == 9 && winningMessage.textContent == "") {
                    winningMessage.textContent = "Draw";
                    winningScreen.style.visibility = "visible";
                    makeVisable();
                }

            })
        });


    });

    const printGameBoard = () => {
        let container = document.createElement("div");
        container.className = "container";
        body.appendChild(container);
        hideMenu();


        for (i = 0; i < 3; i++)
            for (j = 0; j < 3; j++) {
                let item = document.createElement('item');
                item.className = 'item';
                item.dataset.row = i;
                item.dataset.column = j;
                item.dataset.id = id;
                id++;
                container.appendChild(item);
            }
    }

    const resetGame = () => {
        let items = document.querySelectorAll(".item");
        board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        player1Rows = [0, 0, 0];
        player2Rows = [0, 0, 0];
        player1Col = [0, 0, 0];
        player2Col = [0, 0, 0];
        player1Diag = 0;
        player2Diag = 0;
        player1ADiag = 0;
        player2ADiag = 0;
        restartButton.disabled = true;
        backButton.disabled = true;
        items.forEach((el) => el.classList.remove("checked"));
        items.forEach((el) => el.classList.remove("checked2"));
        winningScreen.style.opacity = "0%";
        winningMessage.style.opacity = "0%";
        winningScreen.style.visibility = "hidden";
        movesCount = 0;
        setTimeout(() => { winningMessage.textContent = ""; }, 1000);

    }

    const hideMenu = () => {
        buttonContainer.style.display = "none";
    }



    //-----------------CHECKING WINNERS-------------------

    function player2Move(row, col) {
        player2Rows[row]++;
        player2Col[col]++;

        if (row == col) {
            player2Diag++;
        }

        if (parseInt(row) + parseInt(col) + 1 == 3) {
            player2ADiag++;
        }

        if (player2Rows[row] == 3) {
            return 1; //zwraca 1 jesli wygrana
        }

        if (player2Col[col] == 3) {
            return 1;
        }
        if (player2Diag == 3) {
            return 1;
        }

        if (player2ADiag == 3) {
            return 1;

        }
    }


    function player1Move(row, col) {
        player1Rows[row]++;
        player1Col[col]++;

        if (row == col) {
            player1Diag++;
        }
        if (parseInt(row) + parseInt(col) + 1 == 3) {
            player1ADiag++;
        }

        if (player1Rows[row] == 3) {
            return 1;
        }

        if (player1Col[col] == 3) {
            return 1;
        }
        if (player1Diag == 3) {
            return 1;
        }

        if (player1ADiag == 3) {
            return 1;
        }
    }

    return {
        resetGame,
    }
})();

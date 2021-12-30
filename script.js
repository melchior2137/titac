winningScreen = document.querySelector(".winning-screen");
winningMessage = document.querySelector(".winning-message");
restartButton = document.querySelector(".restart");


const GameBoard = (function () {
    const printGameBoard = () => {
        let container = document.querySelector(".container");
        for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++) {
            let item = document.createElement('item');
            item.className = 'item';
            item.dataset.row = i;
            item.dataset.column = j;
            container.appendChild(item);
        }
    }

    return {
        printGameBoard,
    }
})();

GameBoard.printGameBoard(); // Printing table

let arrGameBoard = [            //tablica przechoujaca aktualny stan gry
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
]; 



let movesCount = 0;                                     //main game code
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        movesCount++;
        if(movesCount%2 == 0){
        item.classList.add("checked");
        arrGameBoard[item.dataset.row][item.dataset.column] = "O";
        if(player2Move(item.dataset.row, item.dataset.column)==1){
        winningMessage.textContent = "Player 2 Won";
        winningScreen.style.visibility  = "visible";
        winningScreen.style.opacity = "100%";
        }
        }
        else{
        item.classList.add("checked2");    
        arrGameBoard[item.dataset.row][item.dataset.column] = "X";
        if(player1Move(item.dataset.row, item.dataset.column)==1){
        winningMessage.textContent = "Player 1 Won";
        winningScreen.style.visibility  = "visible";
        winningScreen.style.opacity = "100%";
        }
        }

        if(movesCount == 9){
            winningMessage.textContent = "Draw";
            winningScreen.style.visibility  = "visible";
            winningScreen.style.opacity = "100%";
        }
        
    }, {once : true})
  })


let player1Rows = [0,0,0];
let player2Rows = [0,0,0];
let player1Col = [0,0,0];
let player2Col = [0,0,0];
let player1Diag = 0;
let player2Diag = 0;
let player1ADiag = 0;
let player2ADiag = 0;



function player2Move(row, col){
    player2Rows[row]++;
    player2Col[col]++;

    if(row==col){
        player2Diag++;
        }

    if(parseInt(row) + parseInt(col) + 1 == 3){
        player2ADiag++;
    }
    
    if(player2Rows[row]==3){
        return 1; //zwraca 1 jesli wygrana
    }

    if(player2Col[col]==3){
        return 1;
    }
    if(player2Diag == 3){
        return 1;
    }

    if(player2ADiag == 3){
        return 1;

    }
}


function player1Move(row, col){
    player1Rows[row]++;
    player1Col[col]++;

    if(row==col){
        player1Diag++;
    }
    if(parseInt(row) + parseInt(col) + 1 == 3){
        player1ADiag++;
    }

    if(player1Rows[row]==3){
        return 1;
    }

    if(player1Col[col]==3){
        return 1;
    }
    if(player1Diag == 3){
        return 1;
    }

    if(player1ADiag == 3){
        return 1;
    }
}

restartButton.addEventListener('click', () => {
    location.reload()
});
console.dir(document);
function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;

    gameOverElement.firstElementChild.innerHTML = 
    '<h2>You won, <span id="winner-name">PLAYER NAME</span>!</h2>';
    gameOverElement.style.display = 'none';

     let gameBoardIndex = 0;   
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disable'); 
            gameBoardIndex++;
        }
    }
}

function startNewGame(){
    if(players[0].name === '' || players[1].name === ''){
        alert('Please set custom players names for both players!');
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer(){
    //declaramos e iniciamos activeplayer en 0, y aquí le cambiamos el valor con cada click
    if(activePlayer === 0){
        activePlayer = 1;
    }else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event){
    if( event.target.tagName !== 'LI' || gameIsOver){
        return;
    }

    const selectedField = event.target;
     const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        alert('Please select an empty field!')
        return;
    }
    //usamos el valor de active player como indice para insertar el simbolo asignado en el array de players
    selectedField.textContent = players[activePlayer].symbol //players[0]
    selectedField.classList.add('disabled');

   //creamos un array gameData para rastrear los click y simbolos ya clickeado en el tablero
   //usando los numeros de data-col y data-row - 1 como indices y asignando un valor al indice ( activePlayer + 1)
   //para determinar que ya fue seleccionado y por cuál jugador (1) o (2)
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    console.log(gameData);

    const winnerId = checkForGameOver();

    if( winnerId !== 0){
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver(){
    //checking the rows for equality
    for(let i = 0; i < 3; i++){
      if( 
        gameData[i][0] > 0 && 
        gameData[i][0] === gameData[i][1] && 
        gameData[i][1] === gameData[i][2]
    ){        
        return gameData[i][0];
    }  
    }

    //checking the columns for equality
    for(let i = 0; i < 3; i++){
        if( 
          gameData[0][i] > 0 && 
          gameData[0][i] === gameData[1][i] && 
          gameData[0][i] === gameData[2][i]
      ){
          return gameData[0][i];
      }  
      }
 //Diagonal: top left to botton right
    if(
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] && 
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }
 //Diagonal: top right to bottom left
    if (
        gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[1][1] === gameData[2][0]   
    ) {
        return gameData[2][0]
    }

    if (currentRound === 9){
        return -1;
    }
    return 0;
}

function endGame(winnerId){
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if (winnerId > 0){
        const winnerName = players[winnerId -1].name;
        gameOverElement.children[0].children[0].children[0].textContent = winnerName;        
    }else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!'
    }
}

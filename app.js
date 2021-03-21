(() => {
  
  const playerFactory = (name, img, symbol) => {
    return { name, img, symbol }
  }

  const squareFactory = (targetSquare, playerMark, isWinner) => {
    return { targetSquare, playerMark, isWinner }
  }
 


  const variables = (() => {
    let gameBoard = ["","","","","","","","",""];
    const boardFrames = Array.from(document.getElementsByClassName("gridSquare"));
    const newButton = document.getElementById("btnNewGame");
    const theLovelyPig = playerFactory("pig", '<img src="the-lovely-pig.jpeg" alt="lovely frenchie bulldog" width="200" height="200">', "x", "pig");
    const theMonster = playerFactory("monster", "<img width='200' height='200' src='the-monster.jpeg' alt='ugly frenchie bulldog'></img>", "o", "monster");  
    
    let isTurn;
    
    
    return {boardFrames, gameBoard, newButton, theLovelyPig, theMonster, isTurn};      
  })();




const gameMechanisms = (() => {
  
  const checkWinner = () => {
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let isWinner = false;
    let checkedSquare = "";

    // need to solve this check winner thing
    winConditions.forEach((condition) => {
      if(variables.gameBoard[condition[0]] === "x") {

        condition.forEach((squareIndex) => {
          checkedSymbol = variables.gameBoard[condition[0]];
          console.log("checked symbol " + checkedSymbol)
          if(checkedSquare === variables.gameBoard[squareIndex]) {
            isWinner = true;  
            } else {
              isWinner = false;
            };
            
        });
        console.log("we have a winner " + isWinner);
      }
      
  });
  
};

  const getPlayerSymbol = () => {
    if(variables.isTurn == variables.theLovelyPig.name) { 
      variables.isTurn = variables.theMonster.name
      return variables.theMonster.symbol;
    } else {
        variables.isTurn = variables.theLovelyPig.name
        return variables.theLovelyPig.symbol;
      }
    }

  const isEmpty = () => {
    return varibles.gameBoard.every(element => !element);
  }

  const isFull = () => {
    return varibles.gameBoard.every(element => element);
  }

  const getAvaliableMoves = () => {
    let avaliableSquares = [];
    variables.gameBoard.forEach((element, index) => {
      if(!element) {
        avaliableSquares.push(element);
      }
    })
    return avaliableSquares;
  }

  const printBoard = () => {
    let boardString = "";
    variables.gameBoard.forEach((element, index) => {
      boardString += element ? ` ${element} |` : `   |`;
      if((index + 1) % 3 == 0) { 
        boardString = boardString.slice(0,-1);
        if(index < 8) {
          boardString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
          }
        };
      });
      console.log(boardString);
    };

    const setGameBoard = (index) => {
      variables.gameBoard.splice(index, 1, getPlayerSymbol());
      checkWinner();
    }

    variables.boardFrames.forEach((element, index) => {
      element.addEventListener("click", function() {setGameBoard(index)});
      element.addEventListener("click", printBoard);
    });

    variables.newButton.addEventListener("click", getAvaliableMoves);

    return {getPlayerSymbol, isEmpty, printBoard, getAvaliableMoves, isFull};
  })();

})();
  




  /*
  const thelovelyPig = playerFactory('<img src="the-lovely-pig.jpeg" alt="lovely frenchie bulldog" width="200" height="200">', false);
  const theMonster = playerFactory("<img width='200' height='200' src='the-monster.jpeg' alt='ugly frenchie bulldog'></img>", false);

/*
  const game = (() => {
    btnNewGame = document.getElementById("btnNewGame");
    

    const createPlayers = () => {
      boardFrames.forEach((square) => {
        square.addEventListener("click", setPlayerMark);
      });
      if(document.getElementById("theLovelyPigImput").checked) {
        thelovelyPig.isTurn = true;
        theMonster.isTurn = false;
      } else {
        thelovelyPig.isTurn = false;
        theMonster.isTurn = true;
      }
    }

   /* const board
    btnNewGame.addEventListener("click", createPlayers);

    let playedSquares = [];
    const boardFrames = Array.from(document.getElementsByClassName("gridSquare"));

    const renderArray = (playedSquares) => {
      cleanBoard();
      playedSquares.forEach((element) => {
        const newSquare = document.createElement("div");
        newSquare.innerHTML = element.playerMark;
        

        document.getElementById(element.targetSquare).appendChild(newSquare);
        newSquare.disabled = true;
        element.targetSquare.disabled = true;
        document.getElementById(element.targetSquare).removeEventListener("click", setPlayerMark);
        boardFrames.forEach((element) => {
          console.log(element.value);
        })
      });
      checkWin();
    }

    const cleanBoard = () => {
      boardFrames.forEach((square) => {
        square.innerHTML = "";
      });
    }

    const newGame = () => {
      cleanBoard();
      playedSquares = [];
      theLovelyPigArr = [];
      theMonsterArr = [];
    }


/* */
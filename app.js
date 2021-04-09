
(() => {

  const playerFactory = (name, img, symbol, playerType) => {
    return { name, img, symbol, playerType }
  }

  const variables = (() => {
    let isTurn;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gG = false;
    const boardFrames = Array.from(document.getElementsByClassName("gridSquare"));
    const newButton = document.getElementById("btnNewGame");
    const theLovelyPig = playerFactory("pig", '<img src="the-lovely-pig.jpeg" alt="lovely frenchie bulldog" width="200" height="200">', "x", "pig", "");
    const theMonster = playerFactory("monster", "<img width='200' height='200' src='the-monster.jpeg' alt='ugly frenchie bulldog'></img>", "o", "monster", "");
    const theLovelyPigInput = document.getElementById("theLovelyPigInput");
    const theMonsterInput = document.getElementById("theMonsterInput");
    return { boardFrames, gameBoard, newButton, theLovelyPig, theMonster, isTurn, theMonsterInput, theLovelyPigInput, gG };
  })();

  const gameMechanisms = (() => {
    const cleanVariables = () => {

      refreshEvents();
      variables.gameBoard = ["", "", "", "", "", "", "", "", ""];
      graphics.renderArray();
      variables.gG = false;
      selectPlayers();


    }

    const checkWinner = () => {
      const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      const isFull = (element) => element != "";
      const winnerName = variables.isTurn == variables.theLovelyPig.name ? "the Monster" : "the Lovely Pig"
      let winnerSymbol = "-2";
      winConditions.forEach((condition) => {
        if (variables.gameBoard[condition[0]]) {
          if (variables.gameBoard[condition[0]] === variables.gameBoard[condition[1]]
            && variables.gameBoard[condition[0]] === variables.gameBoard[condition[2]]) {
            alert(`The ${winnerName} won the game`);
            variables.gG = true;
            winnerSymbol = variables.gameBoard[condition[0]];
            
            cleanVariables();
            return {"winner": winnerSymbol};
          };
        };
      });
      if (variables.gameBoard.every(isFull)) {
        alert(`Drawn`);
        cleanVariables();
      }
      return {"winner": winnerSymbol};
    };

    const getPlayerSymbol = () => {
      if (variables.isTurn === variables.theLovelyPig.name) {
        variables.isTurn = variables.theMonster.name
        return variables.theLovelyPig.symbol;
      } else {
        variables.isTurn = variables.theLovelyPig.name
        return variables.theMonster.symbol;
      };
    };

    const isEmpty = () => {
      return varibles.gameBoard.every(element => !element);
    };



    const getAvaliableMoves = () => {
      let avaliableSquares = [];
      variables.gameBoard.forEach((element, index) => {
        if (!element) {
          avaliableSquares.push(index);
        };
      });
      return avaliableSquares;
    };

    const printBoard = () => {
      let boardString = "";
      variables.gameBoard.forEach((element, index) => {
        boardString += element ? ` ${element} |` : `   |`;
        if ((index + 1) % 3 == 0) {
          boardString = boardString.slice(0, -1);
          if (index < 8) {
            boardString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
          }
        };
      });
      console.log(checkWinner().winner);
      console.log(boardString);
      
    };

    const getMachineTurn = () => {
      let availableSquares = getAvaliableMoves();
      let index = Math.floor(Math.random() * availableSquares.length);

      if (!(variables.gG)) {
        setGameBoard(availableSquares[index])
      };
      variables.gG = false;
    }

    const setGameBoard = (index) => {
      if (!(variables.gameBoard[index])) {
        variables.gameBoard.splice(index, 1, getPlayerSymbol());
        graphics.renderArray();
        checkWinner();
      };
    };

    const selectPlayers = () => {


      const setTheLovelyPigasPlayer1 = () => {
        variables.isTurn = variables.theLovelyPig.name;
        variables.theLovelyPig.playerType = "human";
        variables.theMonster.playerType = "machine"
      }

      const setTheMonsterAsPlayer1 = () => {
        variables.isTurn = variables.theMonster.name;
        variables.theMonster.playerType = "human"
        variables.theLovelyPig.playerType = "machine";
      }

      variables.theLovelyPigInput.checked === true ?
        setTheLovelyPigasPlayer1() : setTheMonsterAsPlayer1();
    };

    variables.boardFrames.forEach((element, index) => {
      element.addEventListener("click", function boardSetting() { setGameBoard(index) });

    });

    const refreshEvents = () => {
      variables.boardFrames.forEach((element) => {
        element.removeEventListener("click", getMachineTurn);
        element.removeEventListener("click", printBoard);
      });
      variables.boardFrames.forEach((element) => {
        element.addEventListener("click", getMachineTurn, { once: true });
        element.addEventListener("click", printBoard, { once: true });
      })
    }
    variables.newButton.addEventListener("click", cleanVariables);
    variables.newButton.addEventListener("click", selectPlayers);

   

    return { getPlayerSymbol, isEmpty, printBoard, getAvaliableMoves };
  })();


  const graphics = (() => {
    const getImgFromSymbol = (symbol) => {
      if (symbol) {
        if (symbol === "x") {
          return variables.theLovelyPig.img;
        } else {
          return variables.theMonster.img;
        }
      }
      return "";
    }

    const renderArray = () => {
      variables.gameBoard.forEach((element, index) => {
        variables.boardFrames[index].innerHTML = getImgFromSymbol(element);


      });
    }
    return { renderArray }
  })();

})();
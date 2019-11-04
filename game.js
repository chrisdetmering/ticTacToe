const Board = require('./board.js')
const Player = require('./player.js')

class Game { 

  constructor(playerOne, playerTwo) { 
    this.playerX = playerOne
    this.playerO = playerTwo
    this.currPlayer = this.playerX
    this.board = new Board()
  }

  promptPlayer(reader, callBack) { 
    this.board.printGrid()

    reader.question('Place a piece e.g. 0,1: ', (pos) => { 
      const x = parseInt(pos[0]); 
      const y = parseInt(pos[2]); 
      const piece = this.currPlayer.piece; 
        callBack([x, y], piece) 
    }); 

  }

  switchPlayer() { 
    this.currPlayer = (this.currPlayer === this.playerX ) ? this.playerO : this.playerX
  }

  run(reader, completionCallback) { 
   this.promptPlayer(reader, (pos, piece) => { 

      if (!this.board.placePiece(pos, piece)) { 
        console.clear(); 

        this.run(reader, completionCallback)
      } else if (!this.board.won(this.currPlayer.piece)) {

        this.switchPlayer(); 
        this.run(reader, completionCallback)
      } else { 
        this.board.winner(this.currPlayer.piece)
        completionCallback(); 
      }

   }); 
   
   

  } 

}


module.exports = Game


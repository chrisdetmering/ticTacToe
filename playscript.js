const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const Game = require("./game.js")
const Player = require("./player.js")

const myGame = new Game(new Player('O'), new Player('X'))

myGame.run(reader, completion)


function completion() {
  reader.question("Another game 'y' or 'n'? ", (restartGame) => {
    if (restartGame === 'y') {
      let newGame = new Game(new Player('O'), new Player('X'))
      newGame.run(reader, completion)
    } else {
      console.log('See you next time!')
      reader.close()
    }
  })
}
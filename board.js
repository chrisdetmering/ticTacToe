//board class 

class Board { 

  constructor(){ 
    this.grid = [...Array(3)].map ( row => (new Array(3).fill(null))) 
  }

  printGrid() { 
    console.log('  0 1 2'); 
    this.grid.forEach( (row, idx) => { 
     row = row.map(ele => { return ele === null ? '_' : ele })
     console.log(`${idx} ${row.join("|")}`); 
    }); 
  }

  returnPos(pos) { 
    const x = pos[0];
    const y = pos[1];
    return this.grid[x][y]
  }

  assignPos(pos, piece) { 
    const x = pos[0];
    const y = pos[1];
    this.grid[x][y] = piece
  }

  validMove(pos) { 
    if ((pos[0] < 3 && pos[0] >= 0) && (pos[1] < 3 && pos[1] >= 0)) { 
      return this.returnPos(pos) === null;
    }
  }

  placePiece(pos, piece) { 
    if (this.validMove(pos)) { 
      this.assignPos(pos, piece) 
      return true; 
    }

    return false; 
  }
  

  transpose() { 
    let transposed = [...Array(3)].map(row => (new Array(3).fill(null))) 
    this.grid.forEach((row, x) => { 
        row.forEach((ele, y) => { 
          transposed[y][x] = ele 
        })
    })
    return transposed; 
  }


  columns(player) { 
    return this.transpose().some(col => {
      return col.every(pos => {
        return pos === player
      });
    }); 
  }

  rows(player) { 
   return this.grid.some( row => { 
      return row.every( pos => { 
        return pos === player
      });
    }); 
  }

  diagonals(player) { 
   let dDown = [[0, 0], [1, 1], [2, 2]].every( pos => { 
      return this.grid[pos[0]][pos[1]] === player 
    }); 

    let dUp = [[2, 0], [1, 1], [0, 2]].every(pos => {
      return this.grid[pos[0]][pos[1]] === player
    });

    return dDown || dUp; 
  }

  won(player) { 
    return this.columns(player) || this.rows(player) || this.diagonals(player)
  }

  winner(player) { 
    if (this.won(player)) {
      
      console.clear(); 
      this.printGrid(); 
      console.log(`The winner is ${player}!`);
    }
  }

}

module.exports = Board



let myBoard = new Board()


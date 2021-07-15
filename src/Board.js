import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let { nrows, ncols, chanceLightStartsOn } = this.props;
    let board = [];
    // TODO: create array-of-arrays of true/false values
    while (board.length < nrows) {
      let row = [];
      for (let i = 0; i < ncols; i++) {
        row.push(chanceLightStartsOn < Math.random())
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        //if false, switch to true vice versa
        board[y][x] = !board[y][x];
      }
    }
  
    //y = row and x = col
    flipCell(y,x) //flip initial cell
    // TODO: flip this cell and the cells around it
    flipCell(y, x - 1); //flip the left
    flipCell(y, x + 1); //flip the right
    flipCell(y - 1, x); //flip the below
    flipCell(y + 1, x); //flip the top

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.flat().every(cell => !cell)
    this.setState({board, hasWon});
  }

  /** Render game board or winning message. */
  render() {
    let { board, hasWon } = this.state;
    if(hasWon) {
      return <h1 className='neon-blue'>YOU WON!!!</h1>
    }
    let { ncols, nrows } = this.props;
    let tblBoard = []; 
    for(let rows = 0; rows < nrows; rows ++) {
      let row = [];
      for(let columns = 0; columns < ncols; columns ++) {
        row.push(
          <Cell isLit={board[rows][columns]}
            key={`${rows}-${columns}`}
            coord={`${rows}-${columns}`}
            flipCellsAround={this.flipCellsAround}
          />
        )
      }
      tblBoard.push(<tr key={rows}>{row}</tr>)
    }

    return (
      // TODO
      // make table board
      <div>
        <div>
          <span className='neon-orange'>Lights</span>
          <span className='neon-blue'>Out</span>
        </div>
        <table className='Board'>
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    )
    // if the game is won, just show a winning msg & render nothing else
  }
}


export default Board;

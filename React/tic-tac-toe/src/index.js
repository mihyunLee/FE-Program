import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square({ value, onClick, style }) {
  return (
    <button className="square" onClick={onClick} style={style}>
      {value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const isWinningIndex =
      this.props.winningIndex && this.props.winningIndex.indexOf(i) !== -1;
    const styleObj = {
      boxShadow: "0px 2px 8px 0px #FFC233",
      border: "2px solid black",
    };
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        style={isWinningIndex ? styleObj : null}
      />
    );
  }

  render() {
    const size = Math.sqrt(this.props.squares.length);
    const board = [];

    for (let i = 0; i < Math.pow(size, 2); i += size) {
      const boardCol = [];
      for (let j = i; j < i + size; j++) {
        boardCol.push(this.renderSquare(j));
      }
      board.push(
        <div className="board-row" key={i}>
          {boardCol}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isSortByAsc: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // .slice() 로 squares 배열의 복사본을 생성하여 수정한다.

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  toggleMoves() {
    this.setState({
      isSortByAsc: !this.state.isSortByAsc,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button
            className={this.state.stepNumber === move ? "selected" : ""}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    let winningIndex;
    if (winner) {
      status = "Winner: " + winner.player;
      winningIndex = winner.winningIndex;
    } else {
      status = "Current player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winningIndex={winningIndex}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleMoves()}>
            {this.state.isSortByAsc ? "오름차순" : "내림차순"}
          </button>
          <ol>{this.state.isSortByAsc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

// 가로, 세로, 대각선 중 세 값이 같게되면 승자이다.
// 승자를 확인해서 'X', 'O', 또는 null을 반환한다.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        winningIndex: [a, b, c],
      };
    }
  }
  return null;
}

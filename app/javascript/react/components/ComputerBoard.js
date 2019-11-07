import React, { useState, useEffect, useRef } from 'react';
import Chessboard from 'chessboardjsx'
import Chess from 'chess.js'

const ComputerBoard = (props) => {
  const game = useRef(new Chess())
  const [board, setBoard] = useState({
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    pgnArray: []
  })

  const minimaxRoot = (depth, game, isMaximisingPlayer) => {

    let newGameMoves = game.moves();
    let bestMove = -9999;
    let bestMoveFound;

    for(let i = 0; i < newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i]
        game.move(newGameMove);
        let value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
  };

  const minimax = (depth, game, alpha, beta, isMaximisingPlayer) => {
    positionCount++;
    if (depth === 0) {
      let squares = game.SQUARES
      let currentBoard = () => {
        let output = []
        let row = []

        for (var i = 0; i < squares.length; i++) {
          squares[i]
          if (game.get(squares[i]) === null) {
            row.push(null)
          } else {
            row.push(game.get(squares[i]))
          }
          if ((i + 1) % 8 === 0) {
            output.push(row)
            row = []
          }
        }
        return output
      }
        return -evaluateBoard(currentBoard);
    }

    let newGameMoves = game.moves();

    if (isMaximisingPlayer) {
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        let bestMove = 9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
  };

  const evaluateBoard = (board) => {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board()[i][j], i ,j);
        }
    }
    return totalEvaluation;
  };

  const reverseArray = (array) => {
    return array.slice().reverse();
  };

  const pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

  const pawnEvalBlack = reverseArray(pawnEvalWhite);

  const knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

  const bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
  ];

  const bishopEvalBlack = reverseArray(bishopEvalWhite);

  const rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
  ];

  const rookEvalBlack = reverseArray(rookEvalWhite);

  const evalQueen =
    [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
  ];

  const kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
  ];

  const kingEvalBlack = reverseArray(kingEvalWhite);

  const getPieceValue = (piece, x, y) => {
    if (piece === null) {
        return 0;
    }
    let getAbsoluteValue = (piece, isWhite, x ,y) => {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
  };

  const makeBestMove = () => {
    let bestMove = getBestMove(game.current);
    game.current.move(bestMove);

    setBoard(
      {...board,
        fen: game.current.fen(),
        history: game.current.history({ verbose: true }),
        squareStyles: squareStyling({pieceSquare: board.pieceSquare, history: board.history}),
        pgnArray: game.current.pgn({ max_width: 5, newline_char: ","}).split(",")
      })

    if (game.current.game_over()) {
        alert('Game over');
    }
  };

  let positionCount
  const getBestMove = (game) => {
    if (game.game_over()) {
        alert('Game over');
    }

    positionCount = 0;
    let depth = 3
    let bestMove = minimaxRoot(depth, game, true);

    return bestMove;
  };

  const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      }),
      ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      })
    };
  };

  const removeHighlightSquare = () => {
    setBoard({...board, squareStyles: squareStyling({ pieceSquare: board.pieceSquare, history: board.history })
    })
  }

  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: board.history,
            pieceSquare: board.pieceSquare
          })
        };
      },
      {}
    );

    setBoard(
      {...board,
        squareStyles: { ...board.squareStyles, ...highlightStyles }
    })
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    });

    if (move === null) return;

    setBoard(
      {...board,
        fen: game.current.fen(),
        history: game.current.history({ verbose: true }),
        squareStyles: squareStyling({pieceSquare: board.pieceSquare, history: board.history}),
        pgnArray: game.current.pgn({ max_width: 5, newline_char: ","}).split(",")
      })

      window.setTimeout(makeBestMove(), 250);

  };

  const onMouseOverSquare = square => {
    let moves = game.current.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }
    highlightSquare(square, squaresToHighlight);
  };

  const onMouseOutSquare = square => removeHighlightSquare(square);

  const onDragOverSquare = square => {
    setBoard({...board, dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };

  const onSquareClick = square => {
    setBoard(
      {...board,
        squareStyles: squareStyling({ pieceSquare: square, history: board.history }),
        pieceSquare: square}
      )

    let move = game.current.move({
      from: board.pieceSquare,
      to: square,
      promotion: "q"
    });

    if (move === null) return;

    setBoard(
      {...board,
      fen: game.current.fen(),
      history: game.current.history({ verbose: true }),
      pieceSquare: "",
      pgnArray: game.current.pgn({ max_width: 5, newline_char: ","}).split(",")
    });

    window.setTimeout(makeBestMove(), 250);
  };

  const pgn = game.current.pgn({ max_width: 5, newline_char: <br></br> })
  const pgnRows = board.pgnArray.map((pgn) => {
    let cols = pgn.split(" ")
    if (cols.length === 3) {
      return(
        <tr>
          <td>{cols[0]}</td>
          <td>{cols[1]}</td>
          <td>{cols[2]}</td>
        </tr>
      )
    } else if (cols.length === 2) {
      return(
        <tr>
          <td>{cols[0]}</td>
          <td>{cols[1]}</td>
          <td></td>
        </tr>
      )
    }
  })

  return(
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 medium-6 board-position" id="chessBoard">
          <Chessboard
            position={board.fen}
            showNotation={true}
            sparePieces={false}
            boardStyle={{backgroundColor: 'rgb(240, 217, 181)'}}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            squareStyles={board.squareStyles}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            />
        </div>
        <div className="cell small-12 medium-6">
          <table className="unstriped hover">
            <thead>
              <tr>
                <th width="20">Turn</th>
                <th width="20">White</th>
                <th width="20">Black</th>
              </tr>
            </thead>
            <tbody>
              {pgnRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ComputerBoard

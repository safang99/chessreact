import React, { useState, useEffect, useRef } from 'react';
import Chessboard from 'chessboardjsx'
import Chess from 'chess.js'

const OnlineBoardContainer = (props) => {
  const game = useRef(new Chess())
  const [user, setUser] = useState({})
  const [board, setBoard] = useState({
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    pgnArray: []
  })

  useEffect(() => {
    fetch("/api/v1/users/current", {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      setUser(data)
    })
    App.gameChannel = App.cable.subscriptions.create(
      // Info that is sent to the subscribed method
      {
        channel: "GameChannel",
        game_id: props.match.params["id"]
        // currently this is hardcoded
        // If you had router, you could do:
        // chat_id: props.match.params["id"]
      },
      {
        connected: () => console.log("GameChannel connected"),
        disconnected: () => console.log("GameChannel disconnected"),
        received: data => {

          game.current.move({
            from: data.move.from,
            to: data.move.to,
            promotion: "q"
          });

          setBoard(
            {...board,
              fen: game.current.fen(),
              history: game.current.history({ verbose: true }),
              squareStyles: squareStyling({pieceSquare: board.pieceSquare, history: board.history}),
              pgnArray: game.current.pgn({ max_width: 5, newline_char: ","}).split(",")
            })
          // Data broadcasted from the chat channel
          console.log(data)
        }
      }
    );
  }, [])

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

    App.gameChannel.send({
     move: move,
     user: user
    })
      // console.log(game.current.pgn()) // Displaying the building move list
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

    App.gameChannel.send({
     move: move,
     user: user
    })
  };

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

export default OnlineBoardContainer

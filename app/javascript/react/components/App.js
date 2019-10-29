import React from 'react'
import Chessboard from 'chessboardjsx'

export const App = (props) => {
  const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100vw",
    marginTop: 30,
    marginBottom: 50
  };


  return (
    <div style={boardsContainer}>
      <Chessboard position="start"/>
    </div>
  )
}

export default App

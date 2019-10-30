import React from 'react';

import Chessboard from 'chessboardjsx'

const LocalBoard = (props) => {
  return(
    <div id="chessBoard">
      <Chessboard position="start" />
    </div>
  )
}

export default LocalBoard

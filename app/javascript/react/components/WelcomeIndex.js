import React from 'react';
import { Link } from "react-router-dom"

import LocalBoard from "./LocalBoard"

const WelcomeIndex = (props) => {

  return(
    <div>
      <div>
        <h1>Please select a game mode from below</h1>
      </div>
      <div>
        <Link to="/local">Play a 2 player local game</Link>
      </div>
    </div>
  )
}

export default WelcomeIndex

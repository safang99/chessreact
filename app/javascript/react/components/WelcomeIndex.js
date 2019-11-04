import React from 'react';
import { Link } from "react-router-dom"

import LocalBoard from "./LocalBoard"

const WelcomeIndex = (props) => {

  return(
    <div className="welcome">
      <div>
        <h1>Please select a game mode from below</h1>
      </div>
      <div>
        <Link to="/local">Play a 1-2 player local game</Link>
        <br/>
        <Link to="/computer">Play a game versus a computer</Link>
        <br/>
        <Link to="/online/index">Play an online 2 player game</Link>
      </div>
    </div>
  )
}

export default WelcomeIndex

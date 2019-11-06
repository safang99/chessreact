import React from 'react';
import { Link } from "react-router-dom"

import LocalBoard from "./LocalBoard"

const WelcomeIndex = (props) => {

  return(
    <div className="welcome">
      <div className="welcome-text">
        <h1>Please select a game mode from below</h1>
      </div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x button_group">
            <Link className="button cell small-12 medium-4 game-buttons" data-tooltip data-position="top" title="A local chess game that can be played between 1-2 players on your computer." to="/local">
              Local Game
            </Link>
          <Link className="button cell small-12 medium-4 game-buttons" data-tooltip data-position="top" title="Test your skills against a computer." to="/local">
            Vs Computer
          </Link>
          <Link className="button cell small-12 medium-4 game-buttons" data-tooltip data-position="top" title="Play online against another player. You must create an account to use this mode." to="/online/index">Play online</Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeIndex

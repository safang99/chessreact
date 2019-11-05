import React from 'react';
import { Link } from "react-router-dom"

import LocalBoard from "./LocalBoard"

const WelcomeIndex = (props) => {

  return(
    <div className="welcome">
      <div>
        <h1>Please select a game mode from below</h1>
      </div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x button_group">
            <Link className="button cell small-12 medium-4" to="/local">
              Local Game
            </Link>
            <Link className="button cell small-12 medium-4" to="/local">
              Vs Computer
            </Link>
            <Link className="button cell small-12 medium-4" to="/online/index">Play online</Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomeIndex

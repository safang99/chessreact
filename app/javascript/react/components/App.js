import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"

import LocalBoard from "./LocalBoard"
import WelcomeIndex from "./WelcomeIndex"
import OnlineIndexContainer from "./OnlineIndexContainer"
import OnlineBoardContainer from "./OnlineBoardContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeIndex} />
        <Route exact path="/local" component={LocalBoard} />
        <Route exact path="/online/index" component={OnlineIndexContainer} />
        <Route exact path="/online/:id" component={OnlineBoardContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

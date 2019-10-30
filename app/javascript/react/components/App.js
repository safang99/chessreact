import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"

import LocalBoard from "./LocalBoard"
import WelcomeIndex from "./WelcomeIndex"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeIndex} />
        <Route exact path="/local" component={LocalBoard} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { render } from 'react-dom'

import App from '../react/components/App'
import RedBox from 'redbox-react'
import registerServiceWorker from "./registerServiceWorker"

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')
  if (reactElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, reactElement)
        registerServiceWorker()
      } catch (e) {
        render(<RedBox error={e} />, reactElement)
      }
    }
    else {
      render(<App />, reactElement)
      registerServiceWorker()
    }
  }
})

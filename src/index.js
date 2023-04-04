import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HubStateProvider } from './hub-context'

ReactDOM.render(
  <HubStateProvider>
    <App />
  </HubStateProvider>,
  document.getElementById('hub'))

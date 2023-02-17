import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { GalleryStateProvider } from './context/gallery-context'

ReactDOM.render(
  <GalleryStateProvider>
    <App />
  </GalleryStateProvider>,
  document.getElementById('hub'))

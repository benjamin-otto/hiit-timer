import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './css/base.css'
import './css/light.css'
import './css/dark.css'

import Nav from './components/Nav'

function App() {
  return (
    <Router>
      <div className='container light'>
        <Nav />

      </div>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
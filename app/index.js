import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './css/base.css'
import './css/light.css'
import './css/dark.css'

import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'

function App() {
  const [theme, setTheme] = React.useState('light')
  const toggleTheme = () => { setTheme((theme) => theme === 'light' ? 'dark' : 'light') }

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={`container ${theme}`}>
          <div className='inner-box'>
            <Nav toggleTheme={toggleTheme} />
          </div>
        </div>
      </ThemeProvider>
    </Router >
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
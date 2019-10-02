import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './css/base.css'
import './css/light.css'
import './css/dark.css'

import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Presets from './components/Presets'
import Custom from './components/Custom'

function App() {
  const [theme, setTheme] = React.useState('light')
  const toggleTheme = () => { setTheme((theme) => theme === 'light' ? 'dark' : 'light') }

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={`container ${theme}`}>
          <div className='inner-box'>
            <Nav toggleTheme={toggleTheme} />

            <Switch>
              <Route path='/' exact component={Presets} />
              <Route path='/custom' component={Custom} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
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
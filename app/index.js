import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './css/base.css'
import './css/light.css'
import './css/dark.css'
import './css/timer.css'

import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Presets from './components/Presets'
import Custom from './components/Custom'
import Timer from './components/Timer'

function App() {
  const [theme, setTheme] = React.useState('light')
  const [playAudio, setPlayAudio] = React.useState(true)
  const toggleTheme = () => { setTheme((theme) => theme === 'light' ? 'dark' : 'light') }
  const togglePlayAudio = () => { setPlayAudio((playAudio) => playAudio === true ? false : true) }

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={`container ${theme}`}>
          <div className='inner-box'>
            <Nav toggleTheme={toggleTheme} playAudio={playAudio} togglePlayAudio={togglePlayAudio} />
            <Switch>
              <Route path='/' exact component={Presets} />
              <Route path='/custom' component={Custom} />
              <Route path='/timer' render={(props) => <Timer {...props} playAudio={playAudio} />} />
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
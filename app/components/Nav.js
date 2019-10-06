import React from 'react'
import { NavLink } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import ThemeContext from '../contexts/theme'

const activeStyle = {
  textDecoration: 'underline'
}

export default function ({ toggleTheme, playAudio, togglePlayAudio }) {
  const theme = React.useContext(ThemeContext)

  return (
    <div>
      <div className='flex-row flex-center'>
        <div className='header'>
          Interval Timer
        </div>
      </div>

      <nav>
        <ul className='flex-row space-evenly nav'>
          <li>
            {theme === 'light'
              ? <FontAwesome name='moon' className='icon' onClick={() => toggleTheme()} />
              : <FontAwesome name='sun' className='icon' onClick={() => toggleTheme()} />}
          </li>
          <li>
            <NavLink to='/' exact activeStyle={activeStyle}>
              Presets
            </NavLink>
          </li>
          <li>
            <NavLink to='/custom' activeStyle={activeStyle}>
              Custom
            </NavLink>
          </li>
          <li>
            {playAudio === true
              ? <FontAwesome name='volume-up' className='icon' onClick={() => togglePlayAudio()} />
              : <FontAwesome name='volume-off' className='icon' onClick={() => togglePlayAudio()} />
            }
          </li>
        </ul>
        <hr />
      </nav>
    </div >
  )
}
import React from 'react'
import { NavLink } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import ThemeContext from '../contexts/theme'

export default function ({ toggleTheme }) {
  const theme = React.useContext(ThemeContext)

  return (
    <div>
      <div className='flex-row flex-center header'>
        Interval Timer
      </div>

      <nav>
        <ul className='flex-row flex-center flex-wrap nav'>
          <li>
            <NavLink to='/' exact>
              Presets
          </NavLink>
          </li>
          <li>
            <NavLink to='/custom'>
              Custom
            </NavLink>
          </li>
          <li>
            {theme === 'light'
              ? <FontAwesome name='moon' onClick={() => toggleTheme('dark')} />
              : <FontAwesome name='sun' onClick={() => toggleTheme('light')} />
            }
          </li>
        </ul>
        <hr />
      </nav>
    </div >
  )
}
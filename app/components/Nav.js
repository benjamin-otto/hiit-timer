import React from 'react'
import { NavLink } from 'react-router-dom'


export default function () {
  return (
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
      </ul>
    </nav>
  )
}
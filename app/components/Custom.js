import React from 'react'
import ThemeContext from '../contexts/theme'
import { secondsToMinutes } from '../utils/utils'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function CustomSlider({ name, min, max, value, setValue, convertToMins = true }) {
  const theme = React.useContext(ThemeContext)

  return (
    <div className={'flex-row space-between custom-slider'}>
      <div className='slider-value'>{(convertToMins) ? secondsToMinutes(value) : value}</div>
      <div>{name}</div>
      <div className='slider-container '>
        <input
          type='range'
          min={min}
          max={max}
          value={value}
          className={`slider slider-${theme}`}
          onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  )
}


export default function Custom() {
  const theme = React.useContext(ThemeContext)
  const [rounds, setRounds] = React.useState(10)
  const [warmup, setWarmup] = React.useState(120)
  const [high, setHigh] = React.useState(30)
  const [low, setLow] = React.useState(60)
  const [cooldown, setCooldown] = React.useState(120)
  const search = queryString.stringify({ warmup, low, high, cooldown, rounds, title: 'Custom' })

  return (
    <React.Fragment>
      <div className='custom-container'>
        <CustomSlider name='Warmup' min={0} max={300} value={warmup} setValue={setWarmup} />
        <CustomSlider name='High Interval' min={1} max={300} value={high} setValue={setHigh} />
        <CustomSlider name='Low Interval' min={1} max={300} value={low} setValue={setLow} />
        <CustomSlider name='Cooldown' min={0} max={300} value={cooldown} setValue={setCooldown} />
        <CustomSlider name='Rounds' min={1} max={25} value={rounds} setValue={setRounds} convertToMins={false} />
      </div >
      <div className='flex-row flex-center'>
        <Link to={{ pathname: '/timer', search: `?${search}` }}>
          <button className={`btn btn-${theme}`}>
            Go
            </button>
        </Link>
      </div>
    </React.Fragment>
  )
}
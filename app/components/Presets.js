import React from 'react'
import { Link } from 'react-router-dom'
import presets from '../data/presets'
import ThemeContext from '../contexts/theme'
import queryString from 'query-string'


function PresetCard(props) {
  const { title, warmup, low, high, cooldown, rounds } = props
  const theme = React.useContext(ThemeContext)
  const search = queryString.stringify(props)

  return (
    <Link to={{ pathname: '/timer', search: `?${search}` }}>
      <div className='preset-card'>
        <div className={`title title-${theme}`}>{title}</div>
        <div>Warmup: {warmup}</div>
        <div>High/Low: {`${high}/${low}`}</div>
        <div>Cooldown: {cooldown}</div>
        <div>{rounds} rounds</div>
      </div>
    </Link>
  )
}

export default function Presets() {
  return (
    <div>
      <div className='flex-row flex-wrap space-evenly'>
        {presets.map((preset, index) => {
          const { title, warmup, low, high, cooldown, rounds } = preset

          return <PresetCard
            key={index}
            title={title}
            warmup={warmup}
            low={low}
            high={high}
            cooldown={cooldown}
            rounds={rounds} />
        })}
      </div>
    </div>
  )
}
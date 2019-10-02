import React from 'react'



function PresetCard({ title, warmup, low, high, cooldown, rounds }) {
  return (
    <div className='preset-card'>
      <h3>{title}</h3>
      <div className=''>
        Warmup: {warmup}
      </div>
      <div className=''>
        High/Low: {`${high}/${low}`}
      </div>
      <div className=''>
        Cooldown: {cooldown}
      </div>
      <div className=''>
        {rounds} rounds
      </div>
    </div>
  )
}


export default function Presets() {
  return (
    <div className='flex-row flex-wrap space-evenly'>
      <PresetCard title={'Fat Burner'} warmup={45} low={30} high={60} cooldown={45} rounds={10} />
      <PresetCard title={'Tabata'} warmup={45} low={30} high={60} cooldown={45} rounds={10} />
      <PresetCard title={'Boxing Rounds'} warmup={45} low={30} high={60} cooldown={45} rounds={10} />
    </div>
  )
}
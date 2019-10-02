import React from 'react'


export default function useHover() {
  const [hover, setHover] = React.useState(false)

  const onMouseOver = () => setHover(true)
  const onMouseOut = () => setHover(false)

  return [
    hover,
    { onMouseOver, onMouseOut }
  ]
}
import React from 'react'
import ThemeContext from '../contexts/theme'
import queryString from 'query-string'
import FontAwesome from 'react-fontawesome'
import { secondsToMinutes } from '../utils/utils'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const WARMUP = 'WARMUP'
const LOW = 'LOW'
const HIGH = 'HIGH'
const COOLDOWN = 'COOLDOWN'

function timerReducer(state, action) {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        isRunning: true,
        finishTime: Date.now() + (state.secondsLeft * 1000)
      }
    case 'PAUSE_TIMER':
      return {
        ...state,
        isRunning: false,
        finishTime: null,
      }
    case 'DECREMENT_TIMER':
      return {
        ...state,
        secondsLeft: Math.round((state.finishTime - Date.now()) / 1000)
      }
    case 'INCREMENT_ROUND':
      const { roundIndex, roundsArray } = state
      const nextIndex = roundIndex + 1

      // Workout complete
      if (nextIndex > roundsArray.length - 1)
        return {
          ...state,
          secondsLeft: 0,
          isRunning: false,
          workoutComplete: true
        }

      return {
        ...state,
        secondsLeft: roundsArray[nextIndex].seconds,
        finishTime: Date.now() + ((roundsArray[nextIndex].seconds) * 1000),
        roundIndex: nextIndex
      }
    default:
      throw new Error('Action type not allowed.')
  }
}

function getRoundsArray({ warmup, low, high, cooldown, rounds }) {
  let roundsArray = []

  // Warmup
  if (warmup > 0)
    roundsArray.push({ type: WARMUP, seconds: warmup, number: null })
  // High / Low
  for (let i = 0; i < rounds; i++) {
    roundsArray.push({ type: HIGH, seconds: high, number: i + 1 })
    roundsArray.push({ type: LOW, seconds: low, number: i + 1 })
  }
  // Cooldown
  if (cooldown > 0)
    roundsArray.push({ type: COOLDOWN, seconds: cooldown, number: null })

  return roundsArray
}

export default function Timer({ playAudio }) {
  const theme = React.useContext(ThemeContext)
  const queryObject = queryString.parse(location.search)
  const timerData = queryObject
  const roundsArray = getRoundsArray(timerData)
  const audio = new Audio('../sounds/sound3.mp3')

  const [state, dispatch] = React.useReducer(timerReducer, {
    isRunning: false,
    finishTime: null,
    secondsLeft: roundsArray[0].seconds,
    roundIndex: 0,
    roundsArray,
    workoutComplete: false
  })
  const { isRunning, secondsLeft, roundIndex } = state
  const roundNumber = roundsArray[roundIndex].number
  const { rounds } = queryObject

  // Start/Pause timer interval
  React.useEffect(() => {
    if (isRunning === true) {
      dispatch({ type: 'DECREMENT_TIMER' })

      const id = window.setInterval(() => {
        dispatch({ type: 'DECREMENT_TIMER' })
      }, 1000)

      return () => window.clearInterval(id)
    }
  }, [isRunning])

  // Change rounds
  React.useEffect(() => {
    if (secondsLeft < 0) {
      dispatch({ type: 'INCREMENT_ROUND' })

      if (playAudio === true)
        audio.play()
    }
  }, [secondsLeft])

  const toggleTimer = () => {
    (isRunning === false)
      ? dispatch({ type: 'START_TIMER' })
      : dispatch({ type: 'PAUSE_TIMER' })
  }


  return (
    <React.Fragment>
      <div className='flex-row flex-center'>
        <CircularProgressbarWithChildren
          className={`timer timer-${theme} timer-${roundsArray[roundIndex].type}`}
          minValue={0}
          maxValue={roundsArray[roundIndex].seconds}
          value={secondsLeft}
          strokeWidth={12}
          styles={buildStyles({
            pathTransitionDuration: 1,
            strokeLinecap: 'butt',
            rotation: 0.0,
            textSize: '1.7rem'
          })}>
          <div className={`timer-text timer-${roundsArray[roundIndex].type}`}>
            <div>
              {roundsArray[roundIndex].type}
            </div>
            <div className='time-remaining'>
              {secondsToMinutes(secondsLeft)}
            </div>
            {roundNumber !== null
              ? <div>{`${roundNumber} / ${rounds}`}</div>
              : <div>{roundsArray[roundIndex].type}</div>
            }
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className='flex-row flex-center'>
        <button className={`btn btn-${theme}`} onClick={toggleTimer} disabled={state.workoutComplete}>
          {(isRunning === true)
            ? <FontAwesome name='pause' />
            : <FontAwesome name='play' />}
        </button>
      </div>
    </React.Fragment>
  )
}
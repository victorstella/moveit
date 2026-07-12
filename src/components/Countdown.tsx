import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export default function Countdown() {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    alertActive,
    countdownStart,
    resetCountdown,
    stopAlert
  } = useContext( CountdownContext )

  const [ minuteLeft, minuteRight ] = String( minutes ).padStart( 2, '0' ).split( '' )
  const [ secondLeft, secondRight ] = String( seconds ).padStart( 2, '0' ).split( '' )

  return(
    <div>
      { alertActive && (
        <button
          type="button"
          className={ styles.stopAlertButton }
          onClick={ stopAlert }
        >
          Stop alert
        </button>
      ) }

      <div className={ styles.countdownContainer } >
        <div>
          <span>{ minuteLeft }</span>
          <span>{ minuteRight }</span>
        </div>
        <span>:</span>
        <div>
          <span>{ secondLeft }</span>
          <span>{ secondRight }</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={ styles.countdownButton }
        >
          Cicle ended
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={ `${styles.countdownButton} ${ styles.countdownButtonActive }` }
              onClick={ resetCountdown }
            >
              Give up
            </button>
          ) : (
            <button
              type="button"
              className={ styles.countdownButton }
              onClick={ countdownStart }
            >
              Start a cicle
            </button>
          ) }
        </>
      ) }

    </div>
  )
}
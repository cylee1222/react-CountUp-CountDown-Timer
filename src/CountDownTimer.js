import React from 'react'

export default function CountDownTimer(props) {
  const {
    hours,
    minutes,
    seconds,
    onChangeHours,
    onChangeMinutes,
    onChangeSeconds,
    onClickStartStop,
    onClickReset
  } = props

  return (
    <div>
        <h1>Countup & Countdown Timer</h1>
        <label htmlFor='hours' className='label-hours'>{hours < 10 ? `0${hours}` : hours}</label>
        <span className='label'>Hours</span><input type='range' min='0' max='99' value={hours} onChange={onChangeHours}></input>
        <br />
        <label htmlFor='minutes' className='label-minutes'>{minutes < 10 ? `0${minutes}` : minutes}</label>
        <span className='label'>Minutes</span><input type='range' min='0' max='59' value={minutes} onChange={onChangeMinutes}></input>
        <br />
        <label htmlFor='seconds' className='label-seconds'>{seconds < 10 ? `0${seconds}` : seconds}</label>
        <span className='label'>Seconds</span><input type='range' min='0' max='59' value={seconds} onChange={onChangeSeconds}></input>
        <br />
        <button id='start-stop' className='btn' onClick={onClickStartStop}>Start</button>
        <button id='reset' className='btn' onClick={onClickReset}>Reset</button>
        <br />
        <span id='expired' className='label red'>Time Expired</span>
    </div>
  )
}

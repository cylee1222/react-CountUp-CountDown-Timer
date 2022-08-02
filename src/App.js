import React, { useState, useEffect, useRef } from 'react'; 
import './App.css';
import CountDownTimer from './CountDownTimer';

function App() {

  const HOUR_TO_SECOND = 3600
  const MINUTE_TO_SECOND = 60
  const SECOND_TO_MILLISECOND = 1000

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [countUp, setCountUp] = useState()
  const didMount = useRef(false)

  function handleClickReset(){
    const sliders = document.querySelectorAll('input')
    document.getElementById('expired').style.visibility = 'hidden'
    document.getElementById('start-stop').disabled = false
    for(let i=0;i<sliders.length;i++){
      sliders[i].disabled = false
    }
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }

  function handleClickStartStop(){
    const sliders = document.querySelectorAll('input')
    if(sliders[0].value === '0' && sliders[1].value === '0' && sliders[2].value === '0'){
      setCountUp(true)
    }else{
      setCountUp(false)
    }
    if(countUp){
      document.getElementById('start-stop').disabled = true
    }
    setIsStarted(!isStarted)
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      document.getElementById('expired').style.visibility = 'hidden'
      return
    }

    const start_stop = document.getElementById('start-stop')
    const reset = document.getElementById('reset')
    const sliders = document.querySelectorAll('input')
    let timer

    if(isStarted){
      start_stop.textContent = 'Stop'
      reset.disabled = true
      for(let i=0;i<sliders.length;i++){
        sliders[i].disabled = true
      }


      const totalMilliseconds = 
      (parseInt(sliders[0].value) * HOUR_TO_SECOND + 
      parseInt(sliders[1].value) * MINUTE_TO_SECOND + 
      parseInt(sliders[2].value)) * SECOND_TO_MILLISECOND

      let counter = totalMilliseconds

      if(countUp){
        timer = setTimeout(counter => {
          counter += SECOND_TO_MILLISECOND
          setHours(Math.floor(counter / (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND * MINUTE_TO_SECOND)))
          setMinutes(Math.floor((counter % (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND * MINUTE_TO_SECOND)) / (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND)))
          setSeconds(Math.floor((counter % (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND)) / SECOND_TO_MILLISECOND))
        }, SECOND_TO_MILLISECOND, counter)
      }else{
        timer = setTimeout(counter => {
          counter -= SECOND_TO_MILLISECOND
          setHours(Math.floor(counter / (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND * MINUTE_TO_SECOND)))
          setMinutes(Math.floor((counter % (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND * MINUTE_TO_SECOND)) / (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND)))
          setSeconds(Math.floor((counter % (SECOND_TO_MILLISECOND * MINUTE_TO_SECOND)) / SECOND_TO_MILLISECOND))

          if(counter === 0){
            setIsStarted(isStarted => !isStarted)
            document.getElementById('start-stop').disabled = true
            document.getElementById('expired').style.visibility = 'visible'
          }
        }, SECOND_TO_MILLISECOND, counter)
      }
      

    }else{
      start_stop.textContent = 'Start'
      reset.disabled = false
      
    }

    return () => {
      clearTimeout(timer)
    }

  }, [isStarted, hours, minutes, seconds, countUp])
  
  return (
    <>
      <CountDownTimer 
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onChangeHours={e => setHours(e.target.value)}
        onChangeMinutes={e => setMinutes(e.target.value)}
        onChangeSeconds={e => setSeconds(e.target.value)}
        onClickStartStop={handleClickStartStop}
        onClickReset={handleClickReset}
      />
    </>
  );
}

export default App;

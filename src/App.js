import './App.css';
import { useState } from 'react';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currMinutes, setCurrMinutes] = useState(0);
  const [currSeconds, setCurrSeconds] = useState(0);
  // const [pauseMin, setPauseMin] = useState(0);
  // const [pauseSec, setPauseSec] = useState(0);
  const [currInterval, setCurrInterval] = useState(null);

  const intervalThing = (min,sec) => {
    let s = sec;
    let m = min;
    let interval = setInterval(() => {
      if (m === 0 && s === 0) {
        clearInterval(currInterval);
        setCurrInterval(null);
      }

      if (s === 0) {
        m -= 1;
        s = 59;
      }
      if (m >= 10 && s >= 10) {
        document.getElementById('timer1').innerHTML = m + ":" + s;
      } else if (m >= 10 && s < 10) {
        document.getElementById('timer1').innerHTML = m + ":0" + s;
      } else if (m < 10 && s >= 10) {
        document.getElementById('timer1').innerHTML = "0" + m + ":" + s;
      } else {
        document.getElementById('timer1').innerHTML = "0" + m + ":0" + s;
      }
      setCurrMinutes(m);
      setCurrSeconds(s);

      s -= 1;

    }, 1000)
    setCurrInterval(interval);
  }

  const handleStart = () => {
    if (currInterval != null) {
      clearInterval(currInterval);
      setCurrInterval(null);
    }
    intervalThing(minutes,seconds);
  }

  const handleReset = () => {
    setMinutes(0);
    setSeconds(0);
    if (currInterval != null) {
      clearInterval(currInterval);
      setCurrInterval(null);
    }
    document.getElementById('timer1').innerHTML = "00:00";
  }

  const handlePauseResume = () => {
    if (currInterval != null) {
      clearInterval(currInterval);
      setCurrInterval(null)
    } else {
      intervalThing(currMinutes,currSeconds);
    }
  }

  return (
    <div className="App">
      <input type="text" onChange={(event) => setMinutes(event.target.value)} value={minutes} />Minutes
      <input type="text" onChange={(event) => setSeconds(event.target.value)} value={seconds} />Seconds
      <button onClick={handleStart}>Start</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handlePauseResume}>Resume/Hold</button>
      <h1 id="timer1">00:00</h1>
    </div>
  );
}

export default App;

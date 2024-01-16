import React, { useState, useRef } from 'react';

const StopwatchApp = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(time)}</p>
      <button onClick={startStopwatch}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={resetStopwatch}>Clear</button>
      <button onClick={addLap}>Result</button>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
        ))}
      </ul>
    </div>
  );
};

const formatTime = (time) => {
  const milliseconds = (`00${time % 1000}`).slice(-3);
  const seconds = (`0${Math.floor(time / 1000) % 60}`).slice(-2);
  const minutes = (`0${Math.floor(time / 60000) % 60}`).slice(-2);
  return `${minutes}:${seconds}.${milliseconds}`;
};

export default StopwatchApp;



// function App() {
//   return ()
    

 
// }

// export default App;

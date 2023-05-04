import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isStart) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isStart]);

  const converToString = (time: number) => {
    const date: Date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().substring(11, 19);
  };

  const toggleTimer = () => setIsStart(!isStart);

  const resetAndLapButton = () => {
    if (isStart) {
      setLaps(prevLaps => [...prevLaps, converToString(time)]);
    } else {
      setTime(0);
      setLaps([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>Stopwatch</div>
      </header>
      <div className="body-timer">
        <div className="time-wrapper">
          {converToString(time)}
        </div>
        <div className="button-wrapper">
          <button className="greyButton" onClick={resetAndLapButton}>{!isStart ? 'Reset' : 'Lap'}</button>
          <button className={isStart ? 'redButton' : 'greenButton'} onClick={toggleTimer}>{!isStart ? 'Start' : 'Stop'}</button>
        </div>
        <div className="lap-list">
          {laps.map((lap, index) => (
            <div key={lap}>{`Lap ${index + 1}: ${lap}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { converToString } from '../../utils/utils';

import './Stopwatch.css';
import Buttons from '../Buttons';
import Timer from '../Timer';

const Stopwatch: React.FC = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isStart) {
      interval = setInterval(() => {
        setTime((prevTime: number) => prevTime + 1);
      }, 17);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isStart]);

  const resetAndLapButton = (): void => {
    if (isStart) {
      setLaps((prevLaps: string[]) => [...prevLaps, converToString(time)]);
    } else {
      setTime(0);
      setLaps([]);
    }
  };

  const toggleTimer = (): void => setIsStart(!isStart);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-header">
        <h1>Stopwatch</h1>
      </div>
      <Timer time={time} />
      <div className="stopwatch-button">
        <Buttons
          isDisabled={false}
          isCountdown={false}
          isStart={isStart}
          resetAndLapButton={resetAndLapButton}
          toggleTimer={toggleTimer}
        />
      </div>
      <div className="stopwatch-lap-list">
        {laps.map((lap, index) => (
          <div key={lap}>{`Lap ${index + 1}: ${lap}`}</div>
        ))}
      </div>
    </div>
  );
}

export default Stopwatch;

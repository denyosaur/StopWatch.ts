import React, { useEffect, useState } from 'react';

import './Countdowner.css';
import Buttons from '../Buttons';
import Confetti from '../Confetti';
import Timer from '../Timer';

const Countdowner: React.FC = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isStart && startTime > 0) {
      interval = setInterval(() => {
        setTime((prevTime: number) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsStart(false);
            setShowConfetti(true);
          }
          return prevTime - 1;
        });
      }, 17);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isStart, startTime]);

  const resetButton = (): void => {
    setTime(startTime);
  };

  const inputHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const number = Number(evt.target.value);
    setStartTime(number);
    setTime(number);
  };

  const toggleTimer = (): void => {
    setTime(startTime);
    setIsStart(!isStart);
  };

  return (
    <div className="countdowner-container">
      <div className="countdowner-header">
        <h1>Countdowner</h1>
      </div>
      <Timer time={time} />
      <div className="countdowner-button">
        <Buttons
          isDisabled={startTime <= 0}
          isCountdown={true}
          isStart={isStart}
          resetAndLapButton={resetButton}
          toggleTimer={toggleTimer}
        />
      </div>
      <div className="countdowner-input">
        <label>Number to count from: </label>
        <input
          id="inputNumber"
          onChange={inputHandler}
          type="number"
          value={startTime}
        />
      </div>
      {showConfetti ? <Confetti showConfetti={showConfetti} setShowConfetti={setShowConfetti} /> : <></>}
    </div>
  );
}

export default Countdowner;

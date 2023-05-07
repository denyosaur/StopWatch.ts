import React from 'react';

import './Buttons.css';

const Buttons: React.FC<Props> = ({
  isCountdown = false,
  isStart = false,
  isDisabled = true,
  resetAndLapButton,
  toggleTimer,
}) => (
  <div className="button-container">
    <button
      className="greyButton"
      disabled={isDisabled}
      onClick={resetAndLapButton}>
      {!isStart || isCountdown ? 'Reset' : 'Lap'}
    </button>
    <button
      className={isStart ? 'redButton' : 'greenButton'}
      disabled={isDisabled}
      onClick={toggleTimer}
    >
      {!isStart ? 'Start' : 'Stop'}
    </button>
  </div>
);

interface Props {
  isCountdown: boolean;
  isDisabled: boolean;
  isStart: boolean;
  resetAndLapButton: any;
  toggleTimer: any;
};

export default Buttons;

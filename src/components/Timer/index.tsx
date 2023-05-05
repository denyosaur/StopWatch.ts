import React from 'react';

import './Timer.css';
import { converToString } from '../../utils/utils';

const Timer: React.FC<Props> = ({ time }) => (
  <div className="timer-wrapper">
    {converToString(time)}
  </div>
);

interface Props {
  time: number;
};

export default Timer;

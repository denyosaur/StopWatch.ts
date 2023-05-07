import React, { useState } from 'react';
import './App.css';

import Countdowner from './components/Countdowner';
import Stopwatch from './components/Stopwatch';

function App(): JSX.Element {
  const [timeKeeperToShow, setTimeKeeperToShow] = useState<string>('stopwatch');

  return (
    <div className="App">
      <div className="App-header">
        <div>Time Keeper</div>
      </div>
      <div className="App-options">
        <button
          className={timeKeeperToShow === 'stopwatch' ? "button-left active-button" : "button-left"}
          onClick={() => setTimeKeeperToShow('stopwatch')}
          value="stopwatch">Stopwatch</button>
        <button
          className={timeKeeperToShow === 'countdowner' ? "button-right active-button" : "button-right"}
          onClick={() => setTimeKeeperToShow('countdowner')}
          value="countdowner"
        >Countdowner</button>
      </div>
      <div className='timer-container'>
        {timeKeeperToShow === 'stopwatch'
          ? <Stopwatch />
          : <Countdowner />
        }
      </div>
    </div>
  );
}

export default App;

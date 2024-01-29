import React, { useEffect } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';
function App() {

  return (
    <div>
      <Chart/>
      <br/>
    </div>
  );
}

export default App;

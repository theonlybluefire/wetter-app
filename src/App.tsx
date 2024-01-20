import React, { useEffect } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';
import geocoding from './components/api/geocoding';
function App() {
  useEffect(() => {
    geocoding('Berlin')
  },[])

  forecast()
  return (
    <div>
      <ProgressCircle/>
      <br/>
      <Chart/>
    </div>
  );
}

export default App;

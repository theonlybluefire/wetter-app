import React from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
function App() {
  forecast()
  return (
    <div>
      <ProgressCircle/>
    </div>
  );
}

export default App;

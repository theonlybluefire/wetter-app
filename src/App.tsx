import React, { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';
import QueryApi from './components/api/QueryApi';
function App() {
  return (
    <div>
      <QueryApi/>
    </div>
  );
}

export default App;

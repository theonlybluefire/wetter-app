import React, { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';
import QueryApi from './components/api/ProcessApiData';
import Geocoding from './components/api/Geocoding';
import SidePanel from './components/ui/sidePanel';
function App() {
  return (
    <div>
      <Chart/>
    </div>
  );
}

export default App;

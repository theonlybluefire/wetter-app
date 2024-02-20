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
  const [location, setLocation] = useState('')
  const locationRef = useRef('')
  function handleChange (event) {
    setLocation(event.target.value)
    locationRef.current = event.target.value
  }
  return (
    <div>
      <input onChange={handleChange} value={location}></input>
      <Geocoding location={locationRef.current}/>
    </div>
  );
}

export default App;

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
  function handleChange (event) {
    setLocation(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={location} />
        <button type='submit'>Submit</button>
      </form>
      <Geocoding location={`${location}`}/>
    </div>
  );
}

export default App;

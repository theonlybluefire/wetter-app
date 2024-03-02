import React, { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';
import QueryApi from './components/api/ProcessApiData';
import Geocoding from './components/api/Geocoding';
import SidePanel from './components/ui/sidePanel';
import { motion } from 'framer-motion';
function App() {
  const [location, setLocation] = useState('')
  const inputRef = useRef<string>();
  function handleChange (event) {
    inputRef.current = event.target.value;
  }
  function handleSubmit(event) {
    event.preventDefault();
    setLocation(inputRef.current)
    console.log(event.target.value, inputRef.current, location,'Set Location')
  }
  return (
    <>
      <div className='Chart Container'>
        <Chart/>
        <ProgressCircle/>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <motion.input type="text" onChange={handleChange} />
          <button type='submit'>Submit</button>
        </form>
        <Geocoding location={`${location}`}/>
      </div>
    </>
  );
}

export default App;

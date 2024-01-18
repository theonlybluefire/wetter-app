import React, { useEffect } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';
import geocoding from './components/api/geocoding';
function App() {
  useEffect(() => {
    (async () => {
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=20&language=de&format=json`);
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    })();
}, []);
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

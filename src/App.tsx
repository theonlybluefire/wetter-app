import React, { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import forecast from './components/api/forecast';
import ProgressCircle from './components/tremor/ProgressCircle';
import Chart from './components/tremor/Chart';

function App() {
  const [data,setData] = useState<any>()
  forecast('Main Func').then(data => {
    setData(data)
    console.log(data,'<- FUnc Data',data, '<- Data')
  })
  return (
    <div>
      <Chart data={data}/>
      <br/>
    </div>
  );
}

export default App;

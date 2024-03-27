import { Card, Flex, Text, ProgressCircle } from "@tremor/react";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
export default () => {//main func
  //var def
  const [temp, setTemp] = useState<number>();
  const [status, setStatus] = useState<string>();

  const forecastQuery = useQuery({ //forecast Query
    queryFn: () =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin`).then((res) =>
            res.json(),
        ),
    queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

  useEffect(() => { //process query data
    if(forecastQuery.data) {
      setTemp(Math.round(forecastQuery.data.current.temperature_2m))
      console.log('First Container forecraft Query Container',forecastQuery.data)
      if (forecastQuery.data.rain > 0 || forecastQuery.data.snowfall == 0) {
        setStatus('rainy')
      }
      else if (forecastQuery.data.snowfall > 0 || forecastQuery.data.showers == 0) {
        setStatus('snow')
      }
      else if (forecastQuery.data.showers > 0) {
        setStatus('shower')
      }
      else if (forecastQuery.data.is_day > 0) {
        setStatus('normal')
      }
      else {
        setStatus('night')
      }
    }
    },[forecastQuery])

    if(forecastQuery.isLoading) { //loading case
      return (
        <div className="w-3/3 bg-stone-900 rounded-3xl h-20">
          <Loader/>
        </div>
      )
    }
    if (forecastQuery.error) { //error case
      console.log(forecastQuery.error)
      return (
        <div>Quey Error</div>
      )
    }
  return ( 
<div className="flex gap-5 p-5 rounded-3xl ">
  <div className="grid w-1/3 items-center text-center bg-blue-700 h-32 rounded-3xl">
    <h1 className="font-extrabold text-white text-4xl">{temp}</h1>
  </div>
  <div className="grid grow items-center text-center h-32 rounded-3xl bg-normal-grey">
    <h1 className="font-extrabold text-white text-4xl">{status}</h1>
  </div>
</div>

  );
}


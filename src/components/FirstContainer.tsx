import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";
export function FirstContainer ()  {//main func
  //var def
  const [temp, setTemp] = useState<number>();
  const [status, setStatus] = useState<string>();
  const [classesTemp, setClassesTemp] = useState<string>('grid w-1/3 items-center text-center bg-blue-700 h-32 rounded-3xl');

  const forecastQuery = useQuery({ //forecast Query
    queryFn: () =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin`).then((res) =>
            res.json(),
        ),
    queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

  useEffect(() => { //process query data
    if(forecastQuery.data) {
      setTemp(Math.round(forecastQuery.data.current.temperature_2m));
      console.log('First Container forecraft Query Container',forecastQuery.data);
      if(temp<0) {
        setClassesTemp('grid w-1/3 items-center text-center bg-cyan-300 h-32 rounded-3xl')
      }
      if(temp<15) {
        setClassesTemp('grid w-1/3 items-center text-center bg-cyan-800 h-32 rounded-3xl')
      }
      else if (temp>15 && temp <24) {
        setClassesTemp('grid w-1/3 items-center text-center bg-blue-700 h-32 rounded-3xl')
      }
      else if(temp >24 && temp<30) {
        setClassesTemp('grid w-1/3 items-center text-center bg-red-400 h-32 rounded-3xl')
      }
      else if (temp>30) {
        setClassesTemp('grid w-1/3 items-center text-center bg-red-700 h-32 rounded-3xl')
      }


      if (forecastQuery.data.current.rain > 0 || forecastQuery.data.current.snowfall !> 0 || forecastQuery.data.current.showers !>0) {
        setStatus('rainy')
      }
      else if (forecastQuery.data.current.snowfall > 0 || forecastQuery.data.current.showers !>0) {
        setStatus('snow')
      }
      else if (forecastQuery.data.current.showers > 0) {
        setStatus('shower')
      }
      else if (forecastQuery.data.current.is_day === 1) {
        setStatus('normal')
      }
      else if (forecastQuery.data.current.is_day === 0){
        setStatus('night')
      }
    }
    },[forecastQuery,temp])

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
<div className="flex gap-5 p-5 rounded-3xl bg-dark-blue/40 ">
  <div className={classesTemp}>
    <h1 className="font-extrabold text-white text-4xl">{temp} °C</h1>
  </div>
  <div className="grid grow items-center text-center h-32 rounded-3xl bg-normal-grey">
    <h1 className="font-extrabold text-white text-4xl">{status}</h1>
  </div>
</div>

  );
}


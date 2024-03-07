import { Card, Flex, Text, ProgressCircle } from "@tremor/react";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
export default () => {//main func
  //var def
  const [temp, setTemp] = useState<number>()

  const forecastQuery = useQuery({ //forecast Query
    queryFn: () =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin`).then((res) =>
            res.json(),
        ),
    queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

  useEffect(() => { //process query data
    if(forecastQuery.data) {
      setTemp(Math.round(forecastQuery.data.current.apparent_temperature))
    }
    },[forecastQuery])

    if(forecastQuery.isLoading) { //loading case
      return (
        <div>Loading...</div>
      )
    }
    if (forecastQuery.error) { //error case
      console.log(forecastQuery.error)
      return (
        <div>Quey Error</div>
      )
    }
  return ( 
    <div className="grid place-items-center bg-blue-700 w-1/3 h-20 rounded-3xl">
      <h1>{temp}</h1>
    </div>
  );
}


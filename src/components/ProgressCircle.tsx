import { Card, Flex, Text, ProgressCircle } from "@tremor/react";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
export default () => {//main func
  //var def
  const [temp, setTemp] = useState<number>()
  const [rain, setRain] = useState<number>()

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
      setRain(Math.round(forecastQuery.data.current.rain))
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
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-slate-500 text-sm text-center font-mono">Weather</p>
        <Card className="max-w-sm mx-auto">
          <Flex className="space-x-5" justifyContent="center">
            <ProgressCircle value={1} size="md" color="indigo" showAnimation={true}>
              <span className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-sm text-indigo-500 font-medium">
                SV
               </span>
            </ProgressCircle >
            <ProgressCircle value={temp} size="md" color="violet" showAnimation={true}>
              <span className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-sm text-violet-500 font-medium">
                {temp}
              </span>
            </ProgressCircle>
            <ProgressCircle value={rain} size="md" color="fuchsia" showAnimation={true}>
              <span className="h-12 w-12 rounded-full bg-fuchsia-100 flex items-center justify-center text-sm text-fuchsia-500 font-medium">
                {rain}
              </span>
            </ProgressCircle>
           </Flex>
         </Card>
       </div>
     </div>
  );
}


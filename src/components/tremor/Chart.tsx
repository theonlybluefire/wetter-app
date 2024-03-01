import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProcessAPIData from "../api/ProcessApiData";
const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">{category.value} bpm</p>  
          </div>
        </div>
      ))}
    </div>
  );
};

export default () => {
  const array:Object[] = []

    const forecastQuery = useQuery({
      queryFn: () =>
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin`).then((res) =>
              res.json(),
          ),
      queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

    if(forecastQuery.data ) {
      console.log(forecastQuery.data.hourly.temperature_2m)
      class ChartObject {
        date : Date
        Temperature:Number
        constructor (i:number){
          this.date = data.hourly.time[i];
          this.Temperature = Math.round(data.hourly.temperature_2m[i]);
        }
      } 
      const data = forecastQuery.data
      console.log('Started pushing data')
      for(let i = 0;i<10;i++) {
        array.push(new ChartObject(i))
        console.log(array)
      }
      return (
        <>
        <Card>
          <Title>Temperature</Title>
          <AreaChart
            className="h-72 mt-4"
            data={array}
            index="date"
            categories={["Temperature"]}
            colors={["blue"]}
            yAxisWidth={30}
            customTooltip={customTooltip}
            showAnimation={true}
          />
        </Card>
      </>
      )
    }
  return (
    <div>Loading....</div>
  )

  

};
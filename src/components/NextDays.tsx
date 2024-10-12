import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";

const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">{category.value}</p>  
          </div>
        </div>
      ))}
    </div>
  );
};

export function ChartNextDays()  { 
  const array:Object[] = []
  var entry:number = 0

    const forecastQuery = useQuery({
      queryFn: () =>
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,wind_speed_80m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timezone=Europe%2FBerlin`).then((res) =>
              res.json(),
          ),
      queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

    if(forecastQuery.data ) {
      class ChartObject {
        date : string
        Temperature:Number
        "Precipation Probability":number
        constructor (i:number){
          let sumTemp:number = 0;
          let sumPrec:number = 0;
          for(let i=entry;i<entry+24;i++) {
            sumTemp+=data.hourly.temperature_2m[i]
            sumPrec+=data.hourly.precipitation_probability[i]
          }
          this.date = `${new Date(data.hourly.time[entry]).getDate()}`;
          this.Temperature = Math.round(sumTemp/24);
          this["Precipation Probability"] = Math.round(sumPrec/24);
          entry+=24;
        }
      } 

      const data = forecastQuery.data //set data
      //get days
      entry=0
      for(let i= 0;i<7;i++) { 
        array.push(new ChartObject(i)) 
        }
      console.log('finished data array', array)
      
        return (
          <>
          <Card>
            <Title className="text-3xl font-extrabold text-neutral-300">next days</Title>
            <AreaChart
              className="h-72 mt-4"
              data={array}
              index="date"
              categories={["Temperature","Precipation Probability"]}
              colors={["blue","green"]}
              yAxisWidth={30}
              customTooltip={customTooltip}
              showAnimation={true}
            />
          </Card>
        </>
        )
      }
      return (
        <Loader/>
      )

    }


  


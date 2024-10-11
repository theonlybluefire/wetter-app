import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";

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

export function ChartNextHours()  { 
  const array:Object[] = []
    const forecastQuery = useQuery({
      queryFn: () =>
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin`).then((res) =>
              res.json(),
          ),
      queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

    if(forecastQuery.data ) {
      console.log(forecastQuery.data.hourly)
      class ChartObject {
        date : string;
        Temperature:Number;
        "Precipation Probability":number
        constructor (i:number){
          this.date = `${new Date(data.hourly.time[i]).getHours()}:00`;
          this.Temperature = Math.round(data.hourly.temperature_2m[i]);
          this["Precipation Probability"] = Math.round(data.hourly.precipitation_probability[i]);
        }
      } 

      const data = forecastQuery.data
      for(let i = new Date().getHours();i<new Date().getHours()+10;i++) { //gets current hour +7 musst be bigger than i for the loop to remain
        array.push(new ChartObject(i)) //push new Object
      }
      return (
        <>
        <Card>
          <Title className="text-3xl font-extrabold text-neutral-300">next hours</Title>
          <AreaChart
            className="h-72 mt-4"
            data={array}
            index="date"
            categories={["Temperature","Precipation Probability"]}
            colors={["blue",'green']}
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
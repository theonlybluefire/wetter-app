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
            <p className="font-medium text-tremor-content-emphasis">{category.value} Celsius</p>  
          </div>
        </div>
      ))}
    </div>
  );
};

export function ChartNextDays()  { //
  const array:Object[] = []
  var entry:number = 0

    const forecastQuery = useQuery({
      queryFn: () =>
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${localStorage.getItem('latitude')}&longitude=${localStorage.getItem('longitude')}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin`).then((res) =>
              res.json(),
          ),
      queryKey: ['forecastData',localStorage.getItem('latitude'),localStorage.getItem('longitude')]
  })

    if(forecastQuery.data ) {
      class ChartObject {
        date : string
        Temperature:Number
        constructor (i:number){
          let sum:number = 0
          for(let i=entry;i<entry+24;i++) {//approved
            sum+=data.hourly.temperature_2m[i]
            console.log('current entry point : ',entry)
          }
          entry+=24;
          console.log('current i : ',i,'entry : ',entry,'corresponding date : ',new Date(data.hourly.time[entry]).getDate())
          this.date = `${new Date(data.hourly.time[entry]).getDate()}`;
          
          this.Temperature = Math.round(sum/24);
        }
      } 

      const data = forecastQuery.data
      //get days

      for(let i  = 0;i<7;i++) { //schleife läuft 7 tag 
        array.push(new ChartObject(i)) 
        }
      entry=0
        return (
          <>
          <Card>
            <Title className="text-3xl font-extrabold text-neutral-300">next hours</Title>
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
        <Loader/>
      )

    }


  


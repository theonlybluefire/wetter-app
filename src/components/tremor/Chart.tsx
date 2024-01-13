import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";
import { useRef, useEffect, useState } from "react";
import forecast from "../api/forecast";




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
  const [content, setContent] = useState(true);

    //get data
    const dates = []

     var chartdata = [
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: dates[3],
        "Running": 0,
      },
      {
        date: dates[4],
        "Running": 0,
      },
      {
        date: dates[5],
        "Running": 0,
      },
      {
        date: dates[6],
        "Running": 0,
      },
      {
        date: dates[7],
        "Running": 0,
      },
      {
        date: dates[8],
        "Running": 0,
      },
      {
        date: dates[9],
        "Running": 0,
      },
    ];
    forecast().then((data) => {
      for(let i = 0;i<chartdata.length;i++) {
        chartdata[i].date = data.hourly.time[i];
        console.log(chartdata);
        chartdata[i].Running = data.hourly.temperature2m[i];
      }
      
    })
    return (
      {content ? <div>Loading...</div> : <div>
      <>
          <Card>
            <Title>Temperature</Title>
            <AreaChart
              className="h-72 mt-4"
              data={chartdata}
              index="date"
              categories={["Running"]}
              colors={["blue"]}
              yAxisWidth={30}
              customTooltip={customTooltip}
              showAnimation={true}
            />
          </Card>
        </></div>}
    )
};
import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";
import { useRef, useEffect, useState } from "react";
import forecast from "../api/forecast";
import { ObjectType } from "typescript";




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
    //get data
    var chartdata = useState<Object>();
     chartdata = [
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
      {
        date: 0,
        "Running": 0,
      },
    ];
    
    function fetchData() {
      forecast().then((data) => {
        for(let i = 0;i<9;i++) {
          chartdata[i].date = data.hourly.time[i];
          chartdata[i].Running = data.hourly.temperature2m[i];
        }
      })
    }
    fetchData();
    

    return (
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
    </>
    )
};
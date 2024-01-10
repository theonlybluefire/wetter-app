import { Card, Flex, Text, ProgressCircle } from "@tremor/react";
import React, { useEffect, useState } from "react";
import forecast from "../api/forecast";
export default () => { 
    forecast().then(data => {
       setTemp(Math.round(data.current.apparentTemperature))
       setRain(Math.round(data.current.rain))
      });
      
    const [temp, setTemp] = useState(0);
    const [rain, setRain] = useState(0);

    return (
            <div className="space-y-10">
              <div className="space-y-3">
                <p className="text-slate-500 text-sm text-center font-mono">Weather</p>
                <Card className="max-w-sm mx-auto">
                  <Flex className="space-x-5" justifyContent="center">
                  <ProgressCircle value={1} size="md" color="indigo">
                      <span className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-sm text-indigo-500 font-medium">
                        SV
                      </span>
                    </ProgressCircle>
                    <ProgressCircle value={temp} size="md" color="violet">
                      <span className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-sm text-violet-500 font-medium">
                        {temp}
                      </span>
                    </ProgressCircle>
                    <ProgressCircle value={rain} size="md" color="fuchsia">
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

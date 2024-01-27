import { Card, Flex, Text, ProgressCircle } from "@tremor/react";
import React, { useRef } from "react";
import forecast from "../api/forecast";
export default () => { 
    console.log('Progress Circle Func call')
    forecast().then(data => {
       temp.current = Math.round(data.current.apparentTemperature)
       rain.current = Math.round(data.current.rain)
      });
      
    var temp = useRef<number>();
    var rain = useRef<number>()

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
                    <ProgressCircle value={temp.current} size="md" color="violet" showAnimation={true}>
                      <span className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-sm text-violet-500 font-medium">
                        {temp.current}
                      </span>
                    </ProgressCircle>
                    <ProgressCircle value={rain.current} size="md" color="fuchsia" showAnimation={true}>
                      <span className="h-12 w-12 rounded-full bg-fuchsia-100 flex items-center justify-center text-sm text-fuchsia-500 font-medium">
                        {rain.current}
                      </span>
                    </ProgressCircle>
                  </Flex>
                </Card>
              </div>
            </div>
          );
}

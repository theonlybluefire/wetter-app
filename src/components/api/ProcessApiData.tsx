import { reduceEachTrailingCommentRange } from "typescript"
import React, { useRef } from "react"
type forecastData = {
	current : {
		apparentTemperature: number;
		isDay:number;
		precipitation:number;
		rain: number;
		showers:number;
		snowfall:number;
		temperature2m:number;
		time: Date;
		windDirection10m:number;
		windSpeed10m:number;
	}
	hourly : {
		precipitation: Float32Array;
		precipitationProbability:Float32Array;
		temperature2m:Float32Array;
		time: Date[];
	}
}
export default function ProcessAPIData (UnprocessedData):forecastData {
    console.log('Getting Query Data')
    var data:any = {}
    if(UnprocessedData) {
        console.log('Data there')
        const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        data = {
            isLoading: false,
            error: '',
            current: {
                time: new Date((Number(UnprocessedData.time) + UnprocessedData.utc_offset_seconds) * 1000),
                temperature2m: UnprocessedData.variables(0)!.value(),
                apparentTemperature: UnprocessedData.variables(1)!.value(),
                isDay: UnprocessedData.variables(2)!.value(),
                precipitation: UnprocessedData.variables(3)!.value(),
                rain: UnprocessedData.variables(4)!.value(),
                showers: UnprocessedData.variables(5)!.value(),
                snowfall: UnprocessedData.variables(6)!.value(),
                windSpeed10m: UnprocessedData.variables(7)!.value(),
                windDirection10m: UnprocessedData.variables(8)!.value(),
            },
            hourly: {
                time: range(Number(UnprocessedData.hourly.time()), Number(UnprocessedData.hourly.timeEnd()), UnprocessedData.hourly.interval()).map(
                    (t) => new Date((t + UnprocessedData.utc_offset_seconds) * 1000)
                ),
                temperature2m: UnprocessedData.hourly.variables(0)!.valuesArray()!,
                precipitationProbability: UnprocessedData.hourly.variables(1)!.valuesArray()!,
                precipitation: UnprocessedData.hourly.variables(2)!.valuesArray()!,
            },
        
        };
        console.log('Query API data',data)
        return data
        
    } 
}
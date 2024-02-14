import { useQuery, useQueryClient } from "@tanstack/react-query"
import { reduceEachTrailingCommentRange } from "typescript"
type forecastData = {
    isLoading:boolean;
    error:string;
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
export default ():forecastData => {
    var data:any = {}
    const forecastQuery = useQuery({
        queryFn: () =>
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin').then((res) =>
          res.json(),
        ),
        queryKey: ['forecastData']
    })
    if(forecastQuery.isLoading) {
        data.isLoading = true
    }
    if(forecastQuery.error) {
        data.error = JSON.stringify(forecastQuery.error);
    }
    if(forecastQuery.data) {
        const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        data = {
            isLoading: false,
            error: '',
            current: {
                time: new Date((Number(forecastQuery.data.current.time()) + forecastQuery.data.utc_offset_seconds) * 1000),
                temperature2m: forecastQuery.data.current.variables(0)!.value(),
                apparentTemperature: forecastQuery.data.current.variables(1)!.value(),
                isDay: forecastQuery.data.current.variables(2)!.value(),
                precipitation: forecastQuery.data.current.variables(3)!.value(),
                rain: forecastQuery.data.current.variables(4)!.value(),
                showers: forecastQuery.data.current.variables(5)!.value(),
                snowfall: forecastQuery.data.current.variables(6)!.value(),
                windSpeed10m: forecastQuery.data.current.variables(7)!.value(),
                windDirection10m: forecastQuery.data.current.variables(8)!.value(),
            },
            hourly: {
                time: range(Number(forecastQuery.data.hourly.time()), Number(forecastQuery.data.hourly.timeEnd()), forecastQuery.data.hourly.interval()).map(
                    (t) => new Date((t + forecastQuery.data.utc_offset_seconds) * 1000)
                ),
                temperature2m: forecastQuery.data.hourly.variables(0)!.valuesArray()!,
                precipitationProbability: forecastQuery.data.hourly.variables(1)!.valuesArray()!,
                precipitation: forecastQuery.data.hourly.variables(2)!.valuesArray()!,
            },
        
        };
        return data
    } 
}
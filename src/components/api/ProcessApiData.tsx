import { reduceEachTrailingCommentRange } from "typescript"
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
export default function getQueryData (UnprocessedData):forecastData {
    console.log('Getting Query Data')
    var data:any = {}
    if(UnprocessedData) {
        const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        data = {
            isLoading: false,
            error: '',
            current: {
                time: new Date((Number(UnprocessedData.current.time()) + UnprocessedData.data.utc_offset_seconds) * 1000),
                temperature2m: UnprocessedData.data.current.variables(0)!.value(),
                apparentTemperature: UnprocessedData.data.current.variables(1)!.value(),
                isDay: UnprocessedData.data.current.variables(2)!.value(),
                precipitation: UnprocessedData.data.current.variables(3)!.value(),
                rain: UnprocessedData.data.current.variables(4)!.value(),
                showers: UnprocessedData.data.current.variables(5)!.value(),
                snowfall: UnprocessedData.data.current.variables(6)!.value(),
                windSpeed10m: UnprocessedData.data.current.variables(7)!.value(),
                windDirection10m: UnprocessedData.data.current.variables(8)!.value(),
            },
            hourly: {
                time: range(Number(UnprocessedData.data.hourly.time()), Number(UnprocessedData.data.hourly.timeEnd()), UnprocessedData.data.hourly.interval()).map(
                    (t) => new Date((t + UnprocessedData.utc_offset_seconds) * 1000)
                ),
                temperature2m: UnprocessedData.data.hourly.variables(0)!.valuesArray()!,
                precipitationProbability: UnprocessedData.data.hourly.variables(1)!.valuesArray()!,
                precipitation: UnprocessedData.data.hourly.variables(2)!.valuesArray()!,
            },
        
        };
        console.log('Query API data',data)
        return data
        
    } 
}
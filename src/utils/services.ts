// @ts-ignore
import { DateTime } from 'luxon';
import { IFormaWeather } from './interface';

const formatToLocalTime = (secs: number, format = 'MM-dd-yyyy') =>
  DateTime.fromSeconds(secs).toFormat(format);

const iconUrlFromCode = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`;

const formaWeather = (data: IFormaWeather[]) => {
  const hourlyResponce = data.slice(1, 10).map((d: IFormaWeather) => {
    const {
      dt,
      temp,
      weather: {
        [0]: { icon },
      },
    } = d;
    return {
      time: formatToLocalTime(dt, 'hh:mm a'),
      temp: temp.toFixed(),
      icon,
    };
  });
  return hourlyResponce;
};

export { formatToLocalTime, iconUrlFromCode, formaWeather };

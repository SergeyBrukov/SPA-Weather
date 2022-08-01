import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
// @ts-ignore
import { UilTemperature, UilTear, UilWind, UilSun, UilSunset } from '@iconscout/react-unicons';
import { IFetchWeatherTown } from '../utils/interface';
import { formatToLocalTime, iconUrlFromCode } from '../utils/services';
interface ITownWeatherContainerProps {
  locationWeather: IFetchWeatherTown | null;
}
export const ImgTempWeather: FC<ITownWeatherContainerProps> = ({ locationWeather }) => {
  return (
    locationWeather && (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
          <Box sx={{ display: 'flex' }}>
            <img
              src={iconUrlFromCode(locationWeather?.weather[0].icon)}
              alt=""
              className="icon-url-weather"
            />
            <Typography className="typography-info">
              {Math.round(locationWeather?.main.temp)}°c
            </Typography>
          </Box>
          <Box>
            <Typography className="typography-info">
              <UilTemperature size={18} />
              Real fell:
              <span> {`${locationWeather.main.feels_like.toFixed()}°`}</span>
            </Typography>
            <Typography className="typography-info">
              <UilTear size={18} />
              Humidity:
              <span> {`${locationWeather.main.humidity.toFixed()}%`}</span>
            </Typography>
            <Typography className="typography-info">
              <UilWind size={18} />
              Wind:
              <span> {`${locationWeather.wind.speed.toFixed()} km/h`}</span>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '30px',
              fontSize: '14px',
            }}>
            <UilSun />
            <p>
              Rise: <span>{formatToLocalTime(locationWeather.sys.sunrise, 'hh:mm a')}</span>
            </p>
            <p className="font-light">|</p>

            <UilSunset />
            <p>
              Set: <span>{formatToLocalTime(locationWeather.sys.sunset, 'hh:mm a')}</span>
            </p>
            <p className="font-light">|</p>

            <UilSun />
            <p>
              High: <span>{`${locationWeather.main.temp_max.toFixed()}°`}</span>
            </p>
            <p className="font-light">|</p>

            <UilSun />
            <p>
              Low: <span>{`${locationWeather.main.temp_min.toFixed()}°`}</span>
            </p>
          </Box>
        </Box>
      </>
    )
  );
};

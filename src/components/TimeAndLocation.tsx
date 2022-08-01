import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { IFetchWeatherTown } from '../utils/interface';
import { formatToLocalTime, iconUrlFromCode } from '../utils/services';
interface ITownWeatherContainerProps {
  locationWeather: IFetchWeatherTown | null;
}

const TimeAndLocation: FC<ITownWeatherContainerProps> = ({ locationWeather }) => {
  return (
    locationWeather && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography>{formatToLocalTime(locationWeather?.dt)}</Typography>
        </Box>
        <Box>
          <Typography>{`${locationWeather?.name}, ${locationWeather?.sys.country}`}</Typography>
        </Box>
      </Box>
    )
  );
};

export default TimeAndLocation;

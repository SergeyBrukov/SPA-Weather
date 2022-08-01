import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import { IFetchWeatherTown } from '../utils/interface';

interface ITownWeatherDescription {
  locationWeather: IFetchWeatherTown | null;
}

export const DescriptionWeather: FC<ITownWeatherDescription> = ({ locationWeather }) => {
  const [description, setDescription] = useState<string>('');

  const descriptionWeather = (temp: any): void => {
    if (temp > 15) {
      setDescription(
        "The weather outside is fine! The Sun is shining brightly, birgs are singing lovely songs. The wind is warm and it doesn't make us feel cold. Everyone is happy.",
      );
    }
    if (temp < 15) {
      setDescription(
        'You may seem gloomy to someone, just like the weather you love. But you are just not a euphoric person: you are laconic, do not make unnecessary movements and have critical thinking. In any situation, you have absolutely common sense. Your goals are always as specific as possible, as well as plans to achieve them. Because people sometimes think that you are a very prudent person.',
      );
    }
    if (temp === 0 || temp < 0) {
      setDescription(
        "It's been cold in our area lately. A strong wind is blowing, a torrential downpour is noisy. But I still sweat the warm days of summer. It was very warm, the sun caressed you with its gentle rays, the air was very fresh and you wanted to stay outside all day long.",
      );
    }
  };

  useEffect(() => {
    if (locationWeather) {
      descriptionWeather(locationWeather?.main.temp);
    }
  }, [locationWeather]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '18px',
          paddingBottom: '20px',
          textAlign: 'center',
          fontWeight: 600,
          fontFamily: 'Outfit',
        }}>
        {description}
      </Typography>
    </Box>
  );
};

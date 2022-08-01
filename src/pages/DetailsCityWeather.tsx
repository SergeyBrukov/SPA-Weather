import { Box, Button, Card, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Progres } from '../components/Progres';
import { API_KEY, URL } from '../utils/const';
import { ContextColorShadow, ContextProgress } from '../utils/context';
import { IWeatherDetails } from '../utils/interface';
import { formaWeather, iconUrlFromCode } from '../utils/services';

export const DetailsCityWeather = () => {
  const { town } = useParams();
  const { state } = useLocation();

  const { colorShadow } = useContext(ContextColorShadow);
  const { setProgress, progress } = useContext(ContextProgress);
  const navigation = useNavigate();

  const [weatherDetails, setWeatherDetails] = useState<IWeatherDetails[]>([]);

  const fetchDetailWeather = async (state: any) => {
    const { lat, lon } = state;
    setProgress(!progress);
    try {
      const { data } = await axios.get(
        `${URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`,
      );
      const formatSelectedDetailCityWeather = formaWeather(data.hourly);
      setWeatherDetails(formatSelectedDetailCityWeather);
    } catch (e: any) {
      console.log(e);
    } finally {
      setProgress(false);
    }
  };
  useEffect(() => {
    fetchDetailWeather(state);
  }, []);

  return (
    <Box sx={{ margin: '50px 20px' }}>
      <Card
        className={`card-container ${colorShadow}`}
        sx={{ minHeight: '650px', maxWidth: '500px' }}>
        {progress ? (
          <Progres />
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                padding: '25px',
                gap: '25px',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                title="Back"
                sx={{ minWidth: 'auto', padding: '0' }}
                onClick={() => navigation(-1)}>
                <ReplyAllIcon />
              </Button>
              <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>
                Details weather information {town} city
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                justifyContent: 'space-between',
                gridTemplateColumns: 'repeat(3, 1fr)',
                rowGap: '15px',
              }}>
              {weatherDetails &&
                weatherDetails.map(({ time, icon, temp }) => {
                  return (
                    <Box key={time} sx={{ textAlign: 'center', margin: '15px' }}>
                      <Typography>{time}</Typography>
                      <img src={iconUrlFromCode(icon)} className="w-12 my-1" alt="" />
                      <Typography>{`${temp}°`}</Typography>
                    </Box>
                  );
                })}
            </Box>
          </>
        )}
      </Card>
    </Box>
  );
};

import { Container } from '@mui/system';
import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { API_KEY, URL } from '../utils/const';
import { IFetchWeatherTown, ISearchFields } from '../utils/interface';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, TextField } from '@mui/material';
import { locationValidation } from '../utils/validation';
import { fetchWeatherClientTown } from '../utils/fetchWeatherTown';
import TownWeatherContainer from '../components/TownWeatherContainer';
import { ContextProgress } from '../utils/context';

export const WeatherPage: FC = () => {
  const [locationWeather, setLocationWeather] = useState<IFetchWeatherTown | null>(null);
  const { setProgress, progress } = useContext(ContextProgress);

  const [errors, setErrors] = useState<string | null>(null);
  const { control, handleSubmit, setValue, reset } = useForm<ISearchFields>({
    mode: 'onSubmit',
  });

  const fetchWeather: SubmitHandler<ISearchFields> = async ({ location }) => {
    setErrors(null);
    try {
      setProgress(!progress);
      const { data } = await axios.get(`${URL}weather?q=${location}&units=metric&appid=${API_KEY}`);
      setLocationWeather(data);
      reset();
    } catch (e: any) {
      setErrors(e.response.data.message);
    } finally {
      setProgress(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetchWeatherClientTown<number>(lat, lon).then((responce) => setLocationWeather(responce));
        setErrors(null);
        setValue('location', '');
      });
    }
  };

  useEffect(() => {
    handleLocationClick();
  }, []);

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', width: 'max-content', flexDirection: 'column' }}>
        <form onSubmit={handleSubmit(fetchWeather)} className="fetch-form">
          <Controller
            control={control}
            name="location"
            rules={locationValidation}
            render={({ field, fieldState: { error } }) => (
              <TextField
                id="outlined-basic"
                label="Location"
                margin="normal"
                className="auth-form__input"
                fullWidth={true}
                variant="outlined"
                error={error && true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ''}
                helperText={error && error.message}
                sx={{ margin: '0' }}
              />
            )}
          />
          <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button variant="contained" type="submit" sx={{ height: '100%', maxWidth: '200px' }}>
              Contained
            </Button>
            <Button variant="contained" sx={{ padding: '5px 0' }} onClick={handleLocationClick}>
              <LocationOnIcon />
            </Button>
          </Box>
        </form>
      </Container>
      <TownWeatherContainer
        fetchWeather={fetchWeather}
        setLocationWeather={setLocationWeather}
        progress={progress}
        locationWeather={locationWeather}
        errors={errors}
      />
    </>
  );
};

import { Alert, Button, Card, CardActions, CardContent, Typography, Box } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import React, { FC, useContext, useEffect, useState } from 'react';
import { TypeSetState } from '../utils/type';
import { IFetchWeatherTown, ISelectedCity, ISearchFields } from '../utils/interface';
import { DescriptionWeather } from './DescriptionWeather';
import { ImgTempWeather } from './ImgTempWeather';
import { SelectedCities } from './SelectedCities';
import TimeAndLocation from './TimeAndLocation';
import { CustomAlert } from './CustomAlert';
import { useNavigate } from 'react-router-dom';
import { ContextColorShadow } from '../utils/context';
import { Progres } from './Progres';

interface ITownWeatherContainerProps {
  locationWeather: IFetchWeatherTown | null;
  fetchWeather: (location: ISearchFields) => void;
  progress: boolean;
  errors: string | null;
  setLocationWeather: TypeSetState<IFetchWeatherTown | null>;
}

const TownWeatherContainer: FC<ITownWeatherContainerProps> = ({
  locationWeather,
  progress,
  errors,
  setLocationWeather,
  fetchWeather,
}) => {
  const { colorShadow, setColorShadow } = useContext(ContextColorShadow);
  const [chooseTown, setChooseTown] = useState<ISelectedCity[]>([]);
  const [alertShow, setAlertShow] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getSelectedCities = localStorage.getItem('selectedCities');
    if (getSelectedCities) {
      setChooseTown(JSON.parse(getSelectedCities));
    }
  }, []);

  const shadowContainerWeather = (temp: number): void => {
    if (temp > 15) {
      setColorShadow('suny-shadow');
    }
    if (temp < 15) {
      setColorShadow('midle-suny-shadow');
    }
    if (temp === 0 || temp < 0) {
      setColorShadow('winter-shadow');
    }
  };

  const addTownFun = (name: string): void => {
    const examinationChooseTown = chooseTown.find((town) => town.name === name);
    if (!examinationChooseTown) {
      const newSelectedTown: ISelectedCity = {
        name: name,
        selected: true,
      };
      setChooseTown((prev) => [...prev, newSelectedTown]);
      localStorage.setItem('selectedCities', JSON.stringify([...chooseTown, newSelectedTown]));
    } else {
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
      }, 3000);
    }
  };

  const removeSelectedTown = (townName: string): void => {
    setChooseTown((prev) => prev.filter((prevTown) => prevTown.name !== townName));
    const removeSelectedCities = chooseTown.filter((city) => city.name !== townName);
    localStorage.setItem('selectedCities', JSON.stringify(removeSelectedCities));
  };

  useEffect(() => {
    if (locationWeather) {
      shadowContainerWeather(locationWeather?.main.temp);
    }
  }, [locationWeather]);

  if (errors) {
    return (
      <Alert
        severity="error"
        sx={{ textTransform: 'capitalize', margin: '15px auto', maxWidth: '400px' }}>
        {errors}
      </Alert>
    );
  }

  return (
    <Box sx={{ margin: '50px 20px' }}>
      <Card
        className={`card-container ${colorShadow}`}
        sx={{ minHeight: '550px', maxWidth: '500px' }}>
        {alertShow && (
          <CustomAlert severityType="warning" message="This city is already in the list of saved" />
        )}
        {progress ? (
          <Progres />
        ) : locationWeather ? (
          <Box>
            <SelectedCities
              removeSelectedTown={removeSelectedTown}
              setLocationWeather={setLocationWeather}
              chooseTown={chooseTown}
            />
            <Box>
              <CardContent>
                <TimeAndLocation locationWeather={locationWeather} />
              </CardContent>
              <CardContent>
                <ImgTempWeather locationWeather={locationWeather} />
              </CardContent>
              <CardContent>
                <DescriptionWeather locationWeather={locationWeather} />
              </CardContent>
              <CardActions
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/weather/${locationWeather?.name}`, {
                      state: { lon: locationWeather.coord.lon, lat: locationWeather.coord.lat },
                    })
                  }
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: '#8cc6ff',
                      transition: 'all 0.5s',
                    },
                  }}>
                  Detais
                </Button>
                <Button
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: '#8cc6ff',
                      transition: 'all 0.5s',
                    },
                  }}
                  title="Update"
                  onClick={() => fetchWeather({ location: locationWeather?.name })}>
                  <UpdateIcon />
                </Button>
                <Button
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: '#8cc6ff',
                      transition: 'all 0.5s',
                    },
                  }}
                  size="small"
                  onClick={() => addTownFun(locationWeather?.name)}
                  title="Add town">
                  <AddLocationAltIcon />
                </Button>
              </CardActions>
            </Box>
          </Box>
        ) : (
          <CardContent sx={{ fontSize: '14px' }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: '18px',
                paddingBottom: '20px',
                textAlign: 'center',
                fontWeight: 600,
                fontFamily: 'Outfit',
              }}>
              A day in history
            </Typography>
            <Typography className="typography-info">
              The maximum air temperature recorded in the Service for the last 73 years of
              observations is +32.5°C, recorded on July 27, 1994.
            </Typography>
            <Typography className="typography-info">
              The absolute minimum of +8.9°C was recorded in 1987.
            </Typography>
            <Typography className="typography-info">
              The average temperature for this day is +25.3°C. The heaviest precipitation in Service
              was recorded on July 27, 2004 - 27.2 mm. The maximum wind gusts were in 1975 - up to
              17.97 m / s.
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default React.memo(TownWeatherContainer);

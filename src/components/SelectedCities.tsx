import { Alert, Button } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC, MouseEvent, useContext } from 'react';
import { ContextProgress } from '../utils/context';
import axios from 'axios';
import { API_KEY, URL } from '../utils/const';
import { IFetchWeatherTown, ISelectedCity } from '../utils/interface';
import { TypeSetState } from '../utils/type';

interface ISelectedCities {
  chooseTown: ISelectedCity[];
  setLocationWeather: TypeSetState<IFetchWeatherTown | null>;
  removeSelectedTown: (name: string) => void;
}

export const SelectedCities: FC<ISelectedCities> = ({
  chooseTown,
  setLocationWeather,
  removeSelectedTown,
}) => {
  const { setProgress, progress } = useContext(ContextProgress);

  if (!chooseTown || chooseTown.length === 0) {
    return (
      <Alert severity="info" sx={{ margin: '15px' }}>
        Place for the list of selected cities
      </Alert>
    );
  }

  const fetchWeatherSelectedTown = async (town: string) => {
    try {
      setProgress(!progress);
      const { data } = await axios.get(`${URL}weather?q=${town}&units=metric&appid=${API_KEY}`);
      setLocationWeather(data);
    } catch (e: any) {
      console.log(e);
    } finally {
      setProgress(false);
    }
  };

  const sendRemoveSelectedTownName = (e: MouseEvent<HTMLButtonElement>, town: string): void => {
    e.stopPropagation();
    removeSelectedTown(town);
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid #ccc',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
      {chooseTown &&
        chooseTown.map((town) => {
          return (
            <Box key={town.name} sx={{ padding: '15px' }}>
              <Button
                onClick={() => fetchWeatherSelectedTown(town.name)}
                variant="outlined"
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  padding: '5px 50px 5px 5px',
                  position: 'relative',
                }}>
                {town.name}
                <Button
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    right: '10%',
                    padding: 0,
                    minWidth: 'max-content',
                    '&:hover': {
                      color: '#8cc6ff',
                      transition: 'all 0.5s',
                    },
                  }}
                  onClick={(e) => sendRemoveSelectedTownName(e, town.name)}>
                  <DeleteIcon />
                </Button>
              </Button>
            </Box>
          );
        })}
    </Box>
  );
};

import axios from 'axios';
import { API_KEY, URL } from './const';

export const fetchWeatherClientTown = async <T>(lat: T, lon: T) => {
  try {
    const { data } = await axios.get(
      `${URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );
    return data;
  } catch (e: any) {
    console.log(e);
  }
};

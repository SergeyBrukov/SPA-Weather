import { DetailsCityWeather } from '../pages/DetailsCityWeather';
import { WeatherPage } from '../pages/WeatherPage';
import { IRouters } from './interface';

export const routers: IRouters[] = [
  { path: '/weather', element: <WeatherPage /> },
  { path: '/weather/:town', element: <DetailsCityWeather /> },
];

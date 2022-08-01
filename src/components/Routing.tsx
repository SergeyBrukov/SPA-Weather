import React, { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { WeatherPage } from '../pages/WeatherPage';
import { routers } from '../utils/router';
import { Loyaut } from './Loyaut';

export const Routing: FC = () => {
  const navigation = useNavigate();
  useEffect(() => {
    navigation('/weather');
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Loyaut />}>
        <Route path="/weather" element={<WeatherPage />} />
        {routers.map(({ path, element }) => {
          return <Route key={path} path={path} element={element} />;
        })}
      </Route>
    </Routes>
  );
};

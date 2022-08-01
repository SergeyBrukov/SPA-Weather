import React, { ReactNode } from 'react';

export interface ISearchFields {
  location: string;
}

export interface IFetchWeatherTown {
  base: string;
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    [0]: {
      icon: string;
    };
  };
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  timezone: number;
}

export interface ISelectedCity {
  name: string;
  selected: boolean;
}

export interface IRouters {
  path: string;
  element: ReactNode;
}

export interface IFormaWeather {
  dt: number;
  temp: number;
  weather: {
    [0]: {
      icon: string;
    };
  };
}

export interface IWeatherDetails {
  time: string;
  temp: string;
  icon: string;
}

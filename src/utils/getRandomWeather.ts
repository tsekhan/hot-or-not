import cities from 'dataset/cities.json';
import coutries from 'dataset/countries.json';
import { OPENWEATHERMAP_API_KEY } from '../config';
import { TCityData } from './store';

const API_URL = 'http://api.openweathermap.org/data/2.5/group';

const getRandomCityId = (): number => cities[Math.floor(Math.random() * cities.length)];

const prop = <T, K extends keyof T>(obj: T, key: string) => obj[key as K];

const formatCityWeather = (data: any): TCityData => {
  return {
    country: prop(coutries, data.sys.country),
    name: data.name,
    temperatureInCelsius: data.main.temp,
  };
};

export const getRandomWeather = async (): Promise<[TCityData, TCityData]> => {
  const firstCityId = getRandomCityId();

  let secondCityId;

  do {
    secondCityId = getRandomCityId();
  } while (secondCityId === firstCityId);

  const requestUrl = `${API_URL}?id=${firstCityId},${secondCityId}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;

  const response = await fetch(requestUrl);

  if (response.status === 200) {
    const data = await response.json();

    return [formatCityWeather(data.list[0]), formatCityWeather(data.list[1])];
  }

  throw Error(`Can't fetch weather. Code = ${response.status}`);
};

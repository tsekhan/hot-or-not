import cities from 'dataset/cities.json';
import countries from 'dataset/countries.json';
import { OPENWEATHERMAP_API_KEY, OPENWEATHERMAP_API_URL } from 'config';
import { TCityData } from './store';

/**
 * Get random city ID from cities dataset.
 */
const getRandomCityId = (): number => cities[Math.floor(Math.random() * cities.length)];

/**
 * Get object's prop value
 * @param obj
 * @param key
 */
const prop = <T, K extends keyof T>(obj: T, key: string) => obj[key as K];

/**
 * Convert OpenWeatherMap data to TCityData object
 * @param data
 */
const formatCityWeather = (data: any): TCityData => {
  return {
    country: prop(countries, data.sys.country),
    name: data.name,
    temperatureInCelsius: data.main.temp,
  };
};

/**
 * Get weather data of pair of different randomly selected cities
 */
export const getRandomWeather = async (): Promise<[TCityData, TCityData]> => {
  const firstCityId = getRandomCityId();

  let secondCityId;

  do {
    secondCityId = getRandomCityId();
  } while (secondCityId === firstCityId);

  const requestUrl = `${OPENWEATHERMAP_API_URL}?id=${firstCityId},${secondCityId}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;

  const response = await fetch(requestUrl);

  if (response.status === 200) {
    const data = await response.json();

    return [formatCityWeather(data.list[0]), formatCityWeather(data.list[1])];
  }

  throw Error(`Can't fetch weather. Code = ${response.status}`);
};

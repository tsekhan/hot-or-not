import React, { FunctionComponent, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './GamePage.scss';
import { getRandomWeather } from 'utils/getRandomWeather';
import { TCityData, TStoredData } from '../../utils/store';
import CityWidget from '../CityWidget';
import { Button, Divider, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addResult } from '../../actions/actions';

const { Title } = Typography;

const GamePage: FunctionComponent = () => {
  const score = useSelector<TStoredData, number>((state) => state.score);
  const dispatch = useDispatch();

  const [weather, setWeather] = useState<[TCityData, TCityData] | null>(null);
  const [round, setRound] = useState<number>(0);

  const fetchWeather = async () => setWeather(await getRandomWeather());

  const [gameResult, setGameResult] = useState<boolean | null>(null);

  useEffect(() => {
    fetchWeather();
  }, [round]);

  const onCitySelect = (selection: number) => {
    if (weather) {
      const maxTemperature = Math.max(
        weather[0].temperatureInCelsius,
        weather[1].temperatureInCelsius
      );
      const isAnswerCorrect = weather[selection].temperatureInCelsius === maxTemperature;

      dispatch(
        addResult({
          firstCity: weather[0],
          secondCity: weather[1],
          isCorrect: isAnswerCorrect,
        })
      );

      setGameResult(isAnswerCorrect);
    }
  };

  const setupNewRound = () => {
    setGameResult(null);
    setWeather(null);
    setRound(round + 1);
  };

  let title;

  if (weather && gameResult !== null) {
    title = gameResult ? 'You WON!' : 'You LOST!';
  } else {
    title = 'Which city is hotter?';
  }

  const isUserSelected = gameResult !== null;

  return (
    <div>
      <Title>{title}</Title>
      Score: {score}
      <Divider />
      {weather && (
        <>
          <CityWidget
            country={weather[0].country}
            city={weather[0].name}
            temperatureInCelsius={isUserSelected ? weather[0].temperatureInCelsius : undefined}
            onClick={!isUserSelected ? () => onCitySelect(0) : undefined}
          />
          <CityWidget
            country={weather[1].country}
            city={weather[1].name}
            temperatureInCelsius={isUserSelected ? weather[1].temperatureInCelsius : undefined}
            onClick={!isUserSelected ? () => onCitySelect(1) : undefined}
          />
          {isUserSelected && (
            <div>
              <Button onClick={setupNewRound}>Next cities</Button>
            </div>
          )}
        </>
      )}
      {!weather && <>Loading...</>}
    </div>
  );
};

export default withRouter(GamePage);

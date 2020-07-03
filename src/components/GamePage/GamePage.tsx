import React, { FunctionComponent, useEffect, useState } from 'react';
import { getRandomWeather } from 'utils/getRandomWeather';
import { TCityData, TStoredData } from 'utils/store';
import { ICityWidgetProps } from 'components/CityWidget';
import { Button, Divider, notification, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addResult } from 'actions/actions';
import TwoCitiesWidget from 'components/TwoCitiesWidget';

const { Title } = Typography;

/**
 * Game page
 * @constructor
 */
const GamePage: FunctionComponent = () => {
  const score = useSelector<TStoredData, number>((state) => state.score);
  const dispatch = useDispatch();

  const [weather, setWeather] = useState<[TCityData, TCityData] | null>(null);
  const [round, setRound] = useState<number>(0);

  const fetchWeather = async () => {
    try {
      setWeather(await getRandomWeather());
    } catch (e) {
      notification.error({
        message: 'Failed to load weather',
        description: `Reason: ${e.message}. Try to reload page.`,
      });
    }
  };

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

  let firstCityData: ICityWidgetProps;
  let secondCityData: ICityWidgetProps;

  if (weather) {
    firstCityData = {
      country: weather[0].country,
      name: weather[0].name,
      temperatureInCelsius: isUserSelected ? weather[0].temperatureInCelsius : undefined,
      onClick: !isUserSelected ? () => onCitySelect(0) : undefined,
    };

    secondCityData = {
      country: weather[1].country,
      name: weather[1].name,
      temperatureInCelsius: isUserSelected ? weather[1].temperatureInCelsius : undefined,
      onClick: !isUserSelected ? () => onCitySelect(1) : undefined,
    };
  }

  return (
    <div>
      <Title>{title}</Title>
      Score: {score}
      <Divider />
      {weather && (
        <>
          <TwoCitiesWidget firstCity={firstCityData!} secondCity={secondCityData!} />
          {isUserSelected && (
            <>
              <Divider />
              <Button onClick={setupNewRound}>Next cities</Button>
            </>
          )}
        </>
      )}
      {!weather && <Spin size="large" delay={500} />}
    </div>
  );
};

export default GamePage;

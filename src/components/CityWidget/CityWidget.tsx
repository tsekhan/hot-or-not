import React, { FunctionComponent } from 'react';
import { Typography } from 'antd';
import './CityWidget.scss';
import { useSelector } from 'react-redux';
import { TStoredData } from '../../utils/store';
import TEMPERATURE_UNIT from '../../TEMPERATURE_UNIT';

const { Title, Text } = Typography;

export interface ICityWidgetProps {
  country: string;
  city: string;
  temperatureInCelsius?: number;
  onClick?: () => void;
}

const CityWidget: FunctionComponent<ICityWidgetProps> = ({
  country,
  city,
  temperatureInCelsius,
  onClick,
}) => {
  const unit = useSelector<TStoredData, TEMPERATURE_UNIT>((state) => state.temperatureUnit);

  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  let unitName;
  let convertedTemperature;

  if (temperatureInCelsius !== undefined) {
    if (unit === TEMPERATURE_UNIT.CELSIUS) {
      unitName = 'C';
      convertedTemperature = temperatureInCelsius;
    } else {
      unitName = 'F';
      convertedTemperature = (temperatureInCelsius * 9) / 5 + 32;
    }

    // Limit decimal places to 2
    convertedTemperature = +convertedTemperature.toFixed(2);
  }

  return (
    <div className={`CityWidget ${onClick ? 'CityWidget--clickable' : ''}`} onClick={clickHandler}>
      <div className="CityWidget__content">
        <Title level={4}>{city}</Title>
        <Text strong={true}>{country}</Text>
        {temperatureInCelsius !== undefined && (
          <div className="CityWidget__temperature">
            {convertedTemperature} &deg;{unitName}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityWidget;

import React, { FunctionComponent } from 'react';
import { Button } from 'antd';
import './CityWidget.scss';

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
  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button onClick={clickHandler}>
      {country}
      {city}
      {temperatureInCelsius}
    </Button>
  );
};

export default CityWidget;

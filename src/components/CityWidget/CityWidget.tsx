import React, { FunctionComponent } from 'react';
import './CityWidget.scss';

export interface ICityWidgetProps {
  country: string;
  city: string;
  temperatureInCelsius: number;
}

const CityWidget: FunctionComponent<ICityWidgetProps> = ({
  country,
  city,
  temperatureInCelsius,
}) => {
  return (
    <div>
      {country}
      {city}
      {temperatureInCelsius}
    </div>
  );
};

export default CityWidget;

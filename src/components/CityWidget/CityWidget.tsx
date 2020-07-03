import React, { FunctionComponent } from 'react';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { TStoredData } from 'utils/store';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { useMediaQuery } from 'react-responsive';
import './CityWidget.scss';
import { MOBILE_BREAKPOINT } from '../../config';

const { Title, Text } = Typography;

export interface ICityWidgetProps {
  /**
   * Human-readable name of country where city located
   */
  country: string;

  /**
   * Name of city
   */
  name: string;

  /**
   * Temperature in this city to be displayed if set
   */
  temperatureInCelsius?: number;

  /**
   * Callback for click events
   */
  onClick?: () => void;
}

/**
 * Widget to display city information (location and temperature).
 */
const CityWidget: FunctionComponent<ICityWidgetProps> = ({
  country,
  name,
  temperatureInCelsius,
  onClick,
}) => {
  const unit = useSelector<TStoredData, TEMPERATURE_UNIT>((state) => state.temperatureUnit);
  const isMobile = useMediaQuery({
    query: `(max-width: ${MOBILE_BREAKPOINT}px)`,
  });

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

  const classNames = `CityWidget ${isMobile ? 'CityWidget--mobile' : ''} ${
    onClick ? 'CityWidget--clickable' : ''
  }`;

  return (
    <div className={classNames} onClick={clickHandler}>
      <div className="CityWidget__content">
        <Title level={4}>{name}</Title>
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

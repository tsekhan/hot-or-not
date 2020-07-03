import React, { FunctionComponent } from 'react';
import './TwoCitiesWidget.scss';
import CityWidget, { ICityWidgetProps } from 'components/CityWidget';
import { Space } from 'antd';
import MediaQuery from 'react-responsive';
import { MOBILE_BREAKPOINT } from 'config';

export interface ITwoCitiesWidgetProps {
  firstCity: ICityWidgetProps;
  secondCity: ICityWidgetProps;
}

/**
 * Widget that displays couple of cities
 * @param firstCity
 * @param secondCity
 * @constructor
 */
const TwoCitiesWidget: FunctionComponent<ITwoCitiesWidgetProps> = ({ firstCity, secondCity }) => {
  return (
    <>
      <MediaQuery minWidth={MOBILE_BREAKPOINT + 1}>
        <Space size="large" align="center">
          <CityWidget {...firstCity} />
          <CityWidget {...secondCity} />
        </Space>
      </MediaQuery>
      <MediaQuery maxWidth={MOBILE_BREAKPOINT}>
        <Space className="TwoCitiesWidget__vertical-space" direction="vertical">
          <CityWidget {...firstCity} />
          <CityWidget {...secondCity} />
        </Space>
      </MediaQuery>
    </>
  );
};

export default TwoCitiesWidget;

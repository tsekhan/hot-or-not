import React, { FunctionComponent } from 'react';
import './TwoCitiesWidget.scss';
import CityWidget, { ICityWidgetProps } from 'components/CityWidget';
import { Space } from 'antd';

export interface ITwoCitiesWidgetProps {
  firstCity: ICityWidgetProps;
  secondCity: ICityWidgetProps;
}

const TwoCitiesWidget: FunctionComponent<ITwoCitiesWidgetProps> = ({ firstCity, secondCity }) => {
  return (
    <Space size="large" align="center">
      <CityWidget {...firstCity} />
      <CityWidget {...secondCity} />
    </Space>
  );
};

export default TwoCitiesWidget;

import React, { FunctionComponent } from 'react';
import { Divider, Radio, Space, Typography } from 'antd';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { useDispatch, useSelector } from 'react-redux';
import { TGameResult, TStoredData } from 'utils/store';
import { setTemperatureUnit } from 'actions/actions';
import { RadioChangeEvent } from 'antd/es/radio';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './SettingsPage.scss';
import TwoCitiesWidget from '../TwoCitiesWidget';

const { Title } = Typography;

const SettingsPage: FunctionComponent = () => {
  const unit = useSelector<TStoredData, TEMPERATURE_UNIT>((state) => state.temperatureUnit);
  const gameHistory = useSelector<TStoredData, TGameResult[]>((state) => state.history);

  const dispatch = useDispatch();

  const onChange = (e: RadioChangeEvent) => {
    dispatch(setTemperatureUnit(e.target.value as TEMPERATURE_UNIT));
  };

  return (
    <div className="SettingsPage">
      <Title>Settings</Title>
      <Divider />

      <Title level={2}>Units</Title>
      <Radio.Group defaultValue={unit} onChange={onChange}>
        <Radio value={TEMPERATURE_UNIT.CELSIUS}>Celsius</Radio>
        <Radio value={TEMPERATURE_UNIT.FAHRENHEIT}>Fahrenheit</Radio>
      </Radio.Group>
      <Divider />

      <Title level={2}>History</Title>
      {gameHistory.map((gameResult, index) => (
        <div key={`result-${index}`}>
          <Space size="large" align="center">
            <TwoCitiesWidget firstCity={gameResult.firstCity} secondCity={gameResult.secondCity} />
            {gameResult.isCorrect ? (
              <CheckOutlined className="SettingsPage__icon-yes" />
            ) : (
              <CloseOutlined className="SettingsPage__icon-no" />
            )}
          </Space>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;

import React, { FunctionComponent } from 'react';
import { Divider, Radio, Table, Typography } from 'antd';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { useDispatch, useSelector } from 'react-redux';
import { TCityData, TGameResult, TStoredData } from 'utils/store';
import { setTemperatureUnit } from 'actions/actions';
import { RadioChangeEvent } from 'antd/es/radio';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import CityWidget from '../CityWidget';
import './SettingsPage.scss';

const { Title } = Typography;

const SettingsPage: FunctionComponent = () => {
  const unit = useSelector<TStoredData, TEMPERATURE_UNIT>((state) => state.temperatureUnit);
  const gameHistory = useSelector<TStoredData, TGameResult[]>((state) => state.history);

  const dispatch = useDispatch();

  const onChange = (e: RadioChangeEvent) => {
    dispatch(setTemperatureUnit(e.target.value as TEMPERATURE_UNIT));
  };

  const cityRenderer = (city: TCityData) =>
    city && (
      <CityWidget
        country={city.country}
        city={city.name}
        temperatureInCelsius={city.temperatureInCelsius}
      />
    );

  const columns = [
    {
      dataIndex: 'firstCity',
      key: 'firstСity',
      render: cityRenderer,
    },
    {
      dataIndex: 'secondCity',
      key: 'secondСity',
      render: cityRenderer,
    },
    {
      dataIndex: 'isCorrect',
      key: 'isСorrect',
      render: (isCorrect: boolean) =>
        isCorrect ? (
          <CheckOutlined className="SettingsPage__icon-yes" />
        ) : (
          <CloseOutlined className="SettingsPage__icon-no" />
        ),
    },
  ];

  const gameHistoryWithKeys = gameHistory.map((entry, index) => ({ ...entry, key: index }));

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
      <Table
        dataSource={gameHistoryWithKeys}
        columns={columns}
        showHeader={false}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};

export default SettingsPage;

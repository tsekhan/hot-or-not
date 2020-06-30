import React from 'react';
import { Radio } from 'antd';
import './SettingsPage.scss';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { useDispatch, useSelector } from 'react-redux';
import { IStoredData } from 'utils/store';
import { setTemperatureUnit } from '../../actions/actions';
import { RadioChangeEvent } from 'antd/es/radio';

function SettingsPage() {
  const unit = useSelector<IStoredData>((state) => state.temperatureUnit);
  const dispatch = useDispatch();

  const onChange = (e: RadioChangeEvent) => {
    dispatch(setTemperatureUnit(e.target.value as TEMPERATURE_UNIT));
  };

  return (
    <div>
      <Radio.Group defaultValue={unit} onChange={onChange}>
        <Radio value={TEMPERATURE_UNIT.CELSIUS}>Celsius</Radio>
        <Radio value={TEMPERATURE_UNIT.FAHRENHEIT}>Fahrenheit</Radio>
      </Radio.Group>
    </div>
  );
}

export default SettingsPage;

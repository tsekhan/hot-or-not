import React, { FunctionComponent } from 'react';
import { Button, Result } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './MainPage.scss';

/**
 * Main page
 * @constructor
 */
const MainPage: FunctionComponent = () => {
  return (
    <Result
      icon={<SmileTwoTone />}
      title="Are you ready for incredible battle?"
      extra={
        <Link to="/game">
          <Button danger={true} type="primary">
            Yes!
          </Button>
        </Link>
      }
    />
  );
};

export default MainPage;

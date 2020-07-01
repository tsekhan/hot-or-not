import React, { FunctionComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GamePage.scss';

const GamePage: FunctionComponent = () => {
  return (
    <div>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default withRouter(GamePage);

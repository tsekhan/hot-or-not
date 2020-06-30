import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GamePage.scss';

function GamePage() {
  return (
    <div>
      <Link to="/settings">Settings</Link>
    </div>
  );
}

export default withRouter(GamePage);

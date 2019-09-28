import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';
import Filler from './Filler';

const ProgressBar = props => {
  return (
    <div id="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;

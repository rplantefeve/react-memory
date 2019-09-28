import React from 'react';
import PropTypes from 'prop-types';

import './Filler.css';

const Filler = props => {
  //   width: ${(props) => `${props.percentual}%`};
  return <div id="filler" style={{ width: `${props.percentage}%` }} />;
};

Filler.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Filler;

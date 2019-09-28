import React from 'react';
import PropTypes from 'prop-types';

const Restart = ({ onClick }) => {
  return <button onClick={onClick}>Recommencer</button>;
};

Restart.propTypes = { onClick: PropTypes.func.isRequired };

export default Restart;

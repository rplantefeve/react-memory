import React from 'react';
import PropTypes from 'prop-types';

import './Image.css';

const Image = ({ position }) => (
  <div className="image" style={{ backgroundPosition: position }} />
);

Image.propTypes = {
  position: PropTypes.string.isRequired,
};

export default Image;

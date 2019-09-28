import React from 'react';
import PropTypes from 'prop-types';

import Cache from './Cache';
import Image from './Image';

import './Card.css';

const Card = ({ position, feedback, index, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(index)}>
      {feedback === 'visible' ? <Image position={position} /> : <Cache />}
    </div>
  );
};

Card.propTypes = {
  position: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf(['cache', 'visible']).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;

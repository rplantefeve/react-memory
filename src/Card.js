import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

// card : backgroundPosition. feedback = état d'affichage du symbole
const Card = ({card, feedback, onClick, index}) => (
  <div className='card'>
    <div className='cache'></div>
    <div
      className={`image ${feedback}`}
      style={{ backgroundPosition: card }}
      onClick={()=>onClick(index)}
    >
    </div>
  </div>
);

Card.propTypes = {
  card : PropTypes.string.isRequired,
  onClick : PropTypes.func.isRequired,
  feedback : PropTypes.oneOf([
    'card_revealed',
    'cache',
    'image',
  ]).isRequired,
  index : PropTypes.number.isRequired,
};

export default Card;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cache from './Cache';
import Image from './Image';

import './Card.css';

class Card extends Component {
  onClick = () => {
    this.props.onClick(this.props.index);
  };

  render() {
    return (
      <div className="card" onClick={this.onClick}>
        {this.props.feedback === 'visible' ? (
          <Image position={this.props.position} />
        ) : (
          <Cache />
        )}
      </div>
    );
  }
}

//const Card = ({ position, feedback, index, onClick }) => {};

Card.propTypes = {
  position: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf(['cache', 'visible']).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;

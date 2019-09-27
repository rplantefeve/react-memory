import React from 'react';
import PropTypes from 'prop-types';

import Cache from './Cache';
import Image from './Image';

import './Card.css';

const VISUAL_PAUSE_MSECS = 750;


class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card: props.card,
      feedback: props.feedback,
    }
  }

  // arrow fx for binding
  onClick = () => {
    this.setState({feedback: 'visible'});
    // puis invisible
    setTimeout(() => this.setState({feedback: 'cache'}), VISUAL_PAUSE_MSECS);
  }

  render () {
    // destruct
    const { card, feedback } = this.state;
    return (
      <div className='card' onClick={this.onClick}>
      { feedback === 'visible' ? (
        <Image position={card} />
      ) : (
        <Cache />
      )}
    </div>
    )
  }
}

Card.propTypes = {
  card : PropTypes.string.isRequired,
  feedback : PropTypes.oneOf([
    'cache',
    'visible',
  ]).isRequired,
};

export default Card;

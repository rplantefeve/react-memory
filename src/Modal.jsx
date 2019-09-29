import React from 'react';
import PropTypes from 'prop-types';

import image from './Sad_Face_Emoji_large.png';

import './Modal.css';

class Modal extends React.Component {
  render() {
    // “showing” or “hiding” the modal
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modal">
          <img src={image} alt="Perdu !" />
          <p>{this.props.text}</p>
          <div className="footer">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  text: PropTypes.string,
};

export default Modal;

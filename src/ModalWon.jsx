import React from 'react';
import PropTypes from 'prop-types';

import image from './happy_face.png';

import './Modal.css';

const Modal = ({ show, text, children }) => {
  // “showing” or “hiding” the modal
  if (!show) {
    return null;
  }
  return (
    <div className="backdrop">
      <div className="modal">
        <img src={image} alt="Gagné !" />
        <p>{text}</p>
        <div className="footer">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  text: PropTypes.string,
};

export default Modal;

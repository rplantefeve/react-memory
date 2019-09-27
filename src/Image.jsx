import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ position }) => (
  <div
    className='image'
    style={{ backgroundPosition: position }}>
  </div>
)

Image.propTypes = {
  position: PropTypes.string.isRequired
}

export default Image

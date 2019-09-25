import React from 'react'
import './Filler.css';

const Filler = (props) => {
  //   width: ${(props) => `${props.percentual}%`};
  return (
    <div id="filler" style={{width: `${props.percentage}%`}} />
  )
}

export default Filler

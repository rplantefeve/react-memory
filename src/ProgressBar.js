import React from 'react'
import './ProgressBar.css';
import Filler from './Filler'

const ProgressBar = (props) => {
  return (
    <div id="progress-bar">
      <Filler percentage={props.percentage}/>
    </div>
  )
}

export default ProgressBar

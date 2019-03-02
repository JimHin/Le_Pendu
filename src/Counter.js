import React from 'react'
import './Counter.css';
import PropTypes from 'prop-types'

const Counter = ({counter, gameState}) => (
  <div className="count">reste {10 - counter} essais
      <div className="state">
        {gameState}
        </div>
  </div>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  gameState: PropTypes.oneOf([
    'partie en cours',
    'perdu',
    'gagné',
  ]).isRequired,
}

export default Counter
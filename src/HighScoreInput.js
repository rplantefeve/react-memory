import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './HighScoreInput.css';

import { saveHOFEntry } from './HallOfFame';

class HighScoreInput extends Component {
  // état local
  state = {
    winner: '',
  };

  // Fonction fléchée pour le bind du this
  handleWinnerUpdate = event => {
    this.setState({ winner: event.target.value.toUpperCase() });
  };

  // Fonction fléchée pour le bind du this
  persistWinner = event => {
    // ne pas envoyer le formulaire
    event.preventDefault();
    const newEntry = { guesses: this.props.guesses, winner: this.state.winner };
    // sauvegarder l'entrée dans le localStorage puis appeler la fonction de rappel
    saveHOFEntry(newEntry, this.props.onStored);
  };

  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <p>
          <label>
            Entre ton prénom :
            <input
              type="text"
              autoComplete="given-name"
              value={this.state.winner}
              onChange={this.handleWinnerUpdate}
            />
          </label>
          <button type="submit">J&apos;ai gagné !</button>
        </p>
      </form>
    );
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
};

export default HighScoreInput;

import React from 'react';
import PropTypes from 'prop-types';

import Restart from './Restart';

import './HallOfFame.css';

const HallOfFame = ({ entries, andThen }) => (
  <>
    <table className="hallOfFame">
      <tbody>
        {entries.map(({ id, guesses, date, winner }) => (
          <tr key={id}>
            <td className="date">{date}</td>
            <td className="player">{winner}</td>
            <td className="guesses">{guesses}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Restart onClick={andThen} />
  </>
);

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      guesses: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      winner: PropTypes.string.isRequired,
    })
  ),
  andThen: PropTypes.func.isRequired,
};

export default HallOfFame;

const HOF_KEY = '::Memory::HallofFame';
const HOF_MAX_SIZE = 10;

export function saveHOFEntry(entry, onStored) {
  // récup de la date
  entry.date = new Date().toLocaleDateString();
  entry.id = Date.now();
  // récup des entrées du storage local ou envoi d'un tableau vide
  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]');
  // conserver le tri en fonction du nombre d'essais
  const insertionPoint = entries.findIndex(
    ({ guesses }) => guesses >= entry.guesses
  );

  if (insertionPoint === -1) {
    // insertion à la fin
    entries.push(entry);
  } else {
    entries.splice(insertionPoint, 0, entry);
  }
  // si dépassement de la taille max du tableau
  if (entries.length > HOF_MAX_SIZE) {
    entries.splice(HOF_MAX_SIZE, entries.length);
  }
  // stockage du tableau hall of fame (entries)
  localStorage.setItem(HOF_KEY, JSON.stringify(entries));
  // appel de la méthode une fois le stockage effectué
  onStored(entries);
}

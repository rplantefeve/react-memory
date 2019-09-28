import React from 'react';
import './App.css';

import ProgressBar from './ProgressBar';
import Card from './Card';
import HighScoreInput from './HighScoreInput';
import HallOfFame from './HallOfFame';

import shuffle from 'lodash.shuffle';

//Array of fruits images (background-position)
const FRUITS = [
  '0 -100px',
  '0 -200px',
  '0 -300px',
  '0 -400px',
  '0 -500px',
  '0 -600px',
  '0 -700px',
  '0 -800px',
  '0 -900px',
  '0 -1000px',
  '0 -1100px',
  '0 -1200px',
  '0 -1300px',
  '0 -1400px',
];

// Size of the array of fruits
const SIZE = 28;
const VISUAL_PAUSE_MSECS = 750;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.generateCards(),
      percentage: 0,
      currentPair: [],
      matchedPairs: [],
      timeOut: false,
      tries: 0,
      // tableau d'honneur à jour
      hallOfFame: null,
      intervalId: null,
    };
  }

  /*
  Generate all the cards according to background positions.
   */
  generateCards() {
    // tableau de cartes
    const result = [];
    // taille du tableau
    const size = SIZE;
    // mélanger les cartes
    const candidates = shuffle(FRUITS);
    // tant que le tableau n'est pas plein
    while (result.length < size) {
      const card = candidates.pop();
      // insérer deux fois la carte
      result.push(card, card);
    }
    return shuffle(result);
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedPairs } = this.state;
    const matched = matchedPairs.includes(index);
    // si la carte est dans les cartes trouvées
    if (matched) {
      return 'visible';
    } else {
      // s'il elle est dans la paire courante
      if (currentPair.includes(index)) {
        return 'visible';
      } else {
        return 'cache';
      }
    }
  }

  /*
   arrow fx for binding
   Gère le clic sur une carte
   */
  handleCardClicked = index => {
    const { currentPair, matchedPairs } = this.state;
    // Nous traitons que si et seulement si la carte n'est pas déjà cliquée
    if (!(currentPair.includes(index) || matchedPairs.includes(index))) {
      // si c'est le premier clic
      if (currentPair.length === 0) {
        // on ajoute la carte dans la paire courante
        this.setState({ currentPair: [index] });
      } else if (currentPair.length === 1) {
        // on va déterminer si les cartes composant la paire sont identiques
        this.handleNewPair(index);
      } else {
        // ne rien faire
        return;
      }
    } else {
      return;
    }
  };

  handleNewPair(index) {
    const { cards, currentPair, matchedPairs, tries } = this.state;
    // nouvelle paire
    const newPair = [currentPair[0], index];
    const newTries = tries + 1;
    // on met à jour la paire courante
    this.setState({ currentPair: newPair, tries: newTries });
    // ça matche ?
    const matched = cards[newPair[0]] === cards[newPair[1]];
    if (matched) {
      console.log('Nouvelle paire trouvée ! : ' + newPair);
      // ajout des position des cartes trouvées au tableau des cartes trouvées
      this.setState({ matchedPairs: [...matchedPairs, ...newPair] });
    }
    // temporisation
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  }

  // arrow because binding
  displayHallOfFame = hallOfFame => {
    this.setState({ hallOfFame: hallOfFame });
  };

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    // ajout d'un intervalle
    this.setState({
      intervalId: setInterval(() => {
        const newPercentage = this.state.percentage + 1;
        if (newPercentage < 100) {
          this.setState(() => ({
            percentage: newPercentage,
          }));
        } else {
          clearInterval(this.state.intervalId);
          this.setState({ timeOut: true });
        }
      }, 1000),
    });
  }

  render() {
    // destruct
    const {
      cards,
      percentage,
      timeOut,
      matchedPairs,
      tries,
      hallOfFame,
      intervalId,
    } = this.state;
    const won = matchedPairs.length === cards.length;
    if (won) {
      clearInterval(intervalId);
    }
    return (
      <>
        {timeOut && <p>Perdu !</p>}
        <main>
          {cards.map((position, index) => (
            <Card
              key={index}
              position={position}
              feedback={this.getFeedbackForCard(index)}
              index={index}
              onClick={this.handleCardClicked}
            />
          ))}
        </main>
        <div className="footer">
          {won &&
            (hallOfFame ? (
              <HallOfFame entries={hallOfFame} />
            ) : (
              <HighScoreInput
                guesses={tries}
                onStored={this.displayHallOfFame}
              />
            ))}
        </div>
        {!won && <ProgressBar percentage={percentage} />}
      </>
    );
  }
}

export default App;

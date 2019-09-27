import React from 'react';
import './App.css';

import ProgressBar from './ProgressBar';
import Card from './Card';

import shuffle from 'lodash.shuffle';

//Array of fruits images (background-position)
const FRUITS =   [
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
/*
var app = {

  ,

  //A var to count the number of clicked cards
  clickedCard : 0,

  //A var to count the number of discovered pairs
  discoveredPairs : 0,

  init : function () {
    // Generate the cards
    app.createCards();

    //Start the progess-bar
    app.progessBar();

    //Set a timer before ending the game
    //app.timer = setTimeout(app.gameOver, 5000);
    // Listen to the click on the cards
    $('.card').on('click', app.returnCard);
  },

  //Hide "cache" class child-element and show the "image" class child-element of the clicked card
  returnCard : function () {
    // deactivate the event listener
    $(this).off('click');
    //Increment the clickedCard var
    app.clickedCard++;
    //Toggle the display of the card faces and add an auto-incremented id to the images as we can get and compare them in the checkPair() function
    $(this).find('.cache').toggle();
    $(this).find('.image').toggle().attr('id', app.clickedCard);
    //When we have displayed 2 images we compare them
    if (app.clickedCard == 2) {
      app.checkPair();
    }
  },

  checkPair : function () {
    //Reset the clickedCard var for the next pair of cards we will click on
    app.clickedCard = 0;
    //Get the background-position of the first and second image of the pair
    var image1 = $('#1').css('background-position');
    var image2 = $('#2').css('background-position');
    //If they are not the same, we deactivate the click event on all cards and hide the images pair after 2 seconds
    if (image1 !== image2) {
      $('.card').off('click');
      setTimeout(app.hidePair, 1500);
    }
    //If they are the same, we leave the cards displayed and remove their id to use it with the next pair
    else {
      // change class to enfringe event listener reinitialization
      $('#1').closest('.card').attr('class', 'card_revealed');
      $('#2').closest('.card').attr('class', 'card_revealed');
      // remove ids
      $('#1').attr('id', '');
      $('#2').attr('id', '');
      //Also increment the discoveredPairs var
      app.discoveredPairs++;
      //When we find a new pair, we check if we have found all the pairs
      app.countPairs();
    }
  },

  hidePair : function () {
    // Make both hidden caches visibles again
    $('#1').closest('.card').find('.cache').toggle();
    $('#2').closest('.card').find('.cache').toggle();
    // Make both visible cards hidden again and reinitialize id
    $('#1').toggle().attr('id', '');
    $('#2').toggle().attr('id', '');
    //Reactivate the click event handler to continue playing
    $('.card').on('click', app.returnCard);
  },

  countPairs : function () {
    //If the number of discovered pairs is 14, we win and show a message
    if (app.discoveredPairs == 14) {
      alert('Vous avez gagnéééééé !!!!');
      app.resetGame();
    }
  },
  //Fill the progess bar in red color during 60seconds
  progessBar : function () {
    $('#red-fluid').animate(
      {width : '100%'},
      {duration : 90000,
        easing : 'linear',
        complete : app.gameOver
      }
    );
  },

  gameOver : function () {
    alert('Perdu ! Le délai est écoulé :( Rejouons !');
    app.resetGame();
  },



};

// $(app.init);
*/

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      cards: this.generateCards(),
      percentage: 0
    }
  }

  /*
  Generate all the cards according to background positions.
   */
  generateCards(){
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

  getFeedbackForCard(index){
    return 'cache';
  }

  /*
   arrow fx for binding
   Gère le clic sur une carte
   */
  handleCardClicked = (index) => {
    const { cards } = this.state;
    console.log(cards[index]);
  }

  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount(){
    // ajout d'un interval
    setInterval(() => {
      this.setState(prevState => ({
          percentage: prevState.percentage + 1
        }));
    }, 1000);
  }

  render () {
    // destruct
    const { cards, percentage } = this.state;
    return (
      <>
        <main>
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              feedback={this.getFeedbackForCard(index)}
              index={index}
            />
          ))}
        </main>
        <ProgressBar percentage={percentage} />
      </>
    )
  }
}

export default App;

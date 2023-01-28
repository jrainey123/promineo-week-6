console.log("Card Game of War");
console.log('This game uses a standard 52 card deck and 2 players.')
console.log('It may be necessary to refresh the browser console to see the players cards shown in each round.')


/*1. A standard card deck of 52 cards is used (as opposed to special cards in other games like Uno).
2. Shuffle the deck and split it into 2 equal decks of 26 cards each for 2 players.
3. Face card values are J=11, Q=12, K=13, A=14.
4. In each round 1 card will be removed from each player's deck. The value of the cards will be compared to determine the winner of the round.
5. The winner of each round receives 1 point. A tie results in 0 points awarded.
6. 26 rounds will be played.  Both players will have played all of their cards at the end of Round 26.
7. The total score for each player will be reported after each round and at the End of the Game.
8. At the End of the Game the combined total score of both players may be less than 26 if there are ties (0 points) during the game.*/
//*********************************************************** */
//arrays used to create the style of cards to use in the game
//const SUITS = ['Clubs', 'Diamonds', 'Hearts' 'Spades'];
//used the unicode to display the symbols instead of words
const deckSuits = ['\u2663', '\u2666', '\u2665', '\u2660'];
const deckValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

//maps card faces to values. need numeric values for face cards to make value comparisons.
const cardValueMap = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}
//create Card class
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
} //end Card class
//console.log(freshDeck()); //tested to see cards in freshDeck. array is all cards in order by suit.

//create function to create a new array of 52 cards, 13 values in each of 4 suits. interesting use of flatMap.  just using map would create 4 separate arrays of 13 cards in each suit. flatMap flattens the results to one level one array of 52 cards.
function freshDeck() {
    return deckSuits.flatMap(suit => {
        return deckValues.map(value => {
            return new Card(suit, value)
        })
    })
   }
//console.log(freshDeck()); //tested to see cards in freshDeck. array is all cards in order by suit.


//create Deck class to make a new deck with cards.
class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

//method in Deck class. to generalize the number of cards in a deck.  if a different deck size was used the number of cards would be variable and so would the number of rounds.  this accomodates using any deck size.
get numberOfCards() {
    return this.cards.length;
}

//return the end card of players deck. 
pop() {
    return this.cards
}

//shuffle the deck of cards.  iterates backwards (--i) through the deck.
shuffle() {
	for (let i = this.numberOfCards - 1; i > 0; i--) {
		const newIndex = Math.floor(Math.random() * (i + 1));
		const oldValue = this.cards[newIndex];
		this.cards[newIndex] = this.cards[i];
		this.cards[i] = oldValue;
        }//end for
    }//end method

} //end Deck class


//start the game. not in any class. invokes the constructor in Deck class and shuffles the deck.
const deck = new Deck();
deck.shuffle();
console.log(deck);

//number of rounds depends on the number of cards in the deck and the number of players.
let playerCount = 2;
function numberOfRounds(rounds){
   return (rounds = deck.numberOfCards / playerCount);
} //end function

let playerOneDeck, playerTwoDeck;
//split the shuffled deck into 2 decks, one for each player.
const deckMidpoint = Math.ceil(deck.numberOfCards / playerCount);
    playerOneDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    playerTwoDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
    //console.log(playerOneDeck); //check to see if it's working. array empties out as pop() iterates.
    //console.log(playerTwoDeck);

//loop through player decks showing the end cards with pop(). compare the values to determine winner of each round. there will be 26 rounds.
let playerOneCard, playerTwoCard;
let playerOneScore = 0;
let playerTwoScore = 0;
let scoreTie = 0;
let rounds;

console.log('>>>>>START GAME<<<<<');
console.log('Number of Rounds to Play: ' + numberOfRounds(rounds));

for (let i=1; i<=numberOfRounds(rounds); i++) { //changed 26 to invoking function numberOfRounds. no error here but at line ~150. fixed ~146 and ~150. now the game won't iterate. fixed with syntax.
playerOneCard = playerOneDeck.cards.pop();
playerTwoCard = playerTwoDeck.cards.pop();  
console.log('Round ' + i + ' Start');
console.log('Player One Card:');
console.log(playerOneCard);
console.log('Player Two Card:');
console.log(playerTwoCard);

//tried using template literal but I didn't like the output. See saved screenshot.
// console.log(`
// Round ${i} Start
// Player One Card: ${playerOneCard}`);
// console.log(`
// Player Two Card: ${playerTwoCard}
// Round ${i} End`);
 
//compares the values of player cards in each round.
if (cardValueMap[playerOneCard.value] > cardValueMap[playerTwoCard.value]){
    console.log('Player One Wins 1 point');
    playerOneScore = (playerOneScore + 1);
    //console.log('Player One Score: ' + playerOneScore); experimented with output.
    
    }else if (cardValueMap[playerTwoCard.value] > cardValueMap[playerOneCard.value]){
    console.log('Player Two Wins 1 point');
    playerTwoScore = (playerTwoScore + 1);
    //console.log(playerTwoScore); experimented with output.
}else{
    scoreTie = (scoreTie + 1);
    console.log('Tie - 0 points awarded');
  } //end if
  console.log('Round ' + i + ' Ends');
  console.log('Player One Score: ' + playerOneScore + '| Player Two Score: ' + playerTwoScore);
  console.log('********************************************');
  //numberRounds = i; //don't need for revision with numberofRounds function.
} //end for

console.log('>>>>>END OF GAME<<<<<');
console.log(numberOfRounds(rounds) + ' Rounds Played'); //replaced numberRounds with invoking function numberOfRounds.
console.log('Player One Score: ' + playerOneScore + '| Player Two Score: ' + playerTwoScore + '| Tie Rounds: ' + scoreTie);
if (playerOneScore > playerTwoScore){
    console.log('Player One Wins the Game!');
}else if (playerTwoScore > playerOneScore){
    console.log('Player Two Wins the Game!');
}else{
    console.log('The Game ended in a Tie');
} //end if










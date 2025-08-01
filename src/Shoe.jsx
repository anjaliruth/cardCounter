import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { DrawPileContext } from "./App.js";
import { shoe, numbersAndPictures, shapes, isPicture } from "./library.js";
export default function Shoe() {
  const [players, setPlayers] = useState(2);
  const [hands, setHands] = useState([]);
  const [playing, setPlaying] = useState(false);
  const { drawPile, setDrawPile } = useContext(DrawPileContext);
  const [position, setPosition] = useState(0);
  const [isDealer, setIsDealer] = useState(false);
  const [playerCardCount, setPlayerCardCount] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
  const [allowReset, setAllowReset] = useState(false);
  const [showCardCount, setShowCardCount] = useState(false);

  //## get all 52 x 6 card datadata✅
  //store them in a state called Draw pile✅
  //shuffle cards
  //set the number of people
  //draw cards

  //remove cards from draw pile
  //do count
  //end of hand
  //calculate remainder of draw pile

  //calculates cardCount

  function handlePlayerAmount(e) {
    setPlayers(Number(e.target.value));
  }

  function addtoRunningCount(card) {
    let lowCards = [2, 3, 4, 5, 6];
    let highCards = [10, "J", "Q", "K", "A"];
    if (lowCards.includes(card.value)) {
      setRunningCount((prev) => prev + 1);
    } else if (highCards.includes(card.value)) {
      setRunningCount((prev) => prev - 1);
    } else {
    }
  }
    function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  function newDeck() {
    let cardData = [];
    for (let i = 0; i < numbersAndPictures.length; i++) {
      for (let j = 0; j < shapes.length; j++) {
        let indCardData = { value: numbersAndPictures[i], suit: shapes[j] };
        cardData.push(indCardData);
      }
    }
    return cardData;
  }

  function setupShoe() {
    let shoePile = [];
    let singleDeck = newDeck();
    for (let i = 0; i < shoe; i++) {
      shoePile.push(...singleDeck);
    }
    setDrawPile(shuffle(shoePile));
  }

  useEffect(() => {
    setupShoe();
  }, []);

    useEffect(() => {
    if (isDealer) {
      calculatePlayerCardCount(position);
    }
  }, [isDealer]);

  //this gives the dealer more cards if their second card doesnt cause their card amount to exceed 16
  useEffect(() => {
    if (playerCardCount[position] === undefined) return;
    if (playerCardCount[position] < 17 && position === players) {
      let updatedDrawPile = [...drawPile];
      let dealtHands = [...hands];
      let currentCard = updatedDrawPile.pop();
      dealtHands[position].push(currentCard);
      setDrawPile(updatedDrawPile);
      setHands(dealtHands);
      addtoRunningCount(currentCard);
    }

    calculatePlayerCardCount(position);
  }, [playerCardCount[position]]);

  //calculates players card total
  function calculatePlayerCardCount(currPosition) {
    const currentCardCount = countTo21(currPosition);
//places player total on the current index if player card total has already been counted previously (has already taken a card)
    if (playerCardCount.length === currPosition + 1) {
      let currCardCount = [...playerCardCount];
      currCardCount.splice(currPosition, 1, currentCardCount);
      setPlayerCardCount(currCardCount);
    } 
//adds player total to the next index if playercard total has nto been counted previously (fresh turn)
    else {
      setPlayerCardCount([...playerCardCount, currentCardCount]);
    }
    return currentCardCount;
  }

  function hitCards() {
    //gives player/dealer another card
    let updatedDrawPile = [...drawPile];
    let dealtHands = [...hands];
    let currentCard = updatedDrawPile.pop();
    dealtHands[position].push(currentCard);
    addtoRunningCount(currentCard);
    setDrawPile(updatedDrawPile);
    setHands(dealtHands);

    //moves position if player cardCount > 21
    let currentCardCount = calculatePlayerCardCount(position);
    let currPosition = position;
    if (currentCardCount > 21) {
      currPosition = position + 1;
      setPosition(currPosition);
    }
    //dealers cards
    if (currPosition === players) {
      setIsDealer(true);
      let updatedDrawPile = [...drawPile];
      let dealtHands = [...hands];
      let currentCard = updatedDrawPile.pop();
      dealtHands[position + 1].push(currentCard);
      setDrawPile(updatedDrawPile);
      setHands(dealtHands);
      addtoRunningCount(currentCard);
      setAllowReset(true);
    }
  }

  function stay() {
    let currPosition = position;
    let x = calculatePlayerCardCount(currPosition);
    console.log(x, "x");
    currPosition = position + 1;

    console.log(position, "position before");
    setPosition(currPosition);
    console.log(position, "position +1");

    //dealers cards
    if (currPosition === players) {
      setIsDealer(true);
      let updatedDrawPile = [...drawPile];
      let dealtHands = [...hands];
      let currentCard = updatedDrawPile.pop();
      dealtHands[position + 1].push(currentCard);
      setDrawPile(updatedDrawPile);
      setHands(dealtHands);
      addtoRunningCount(currentCard);
      console.log(position, "positionx");
      setAllowReset(true);
    }

    const currentCardCount = countTo21(currPosition);
    if (currentCardCount >= 21) {
      let currPosition = position + 1;
      setPosition(currPosition);
    }
  }

  function countTo21(currPosition) {
    let isSoft = false;
    const count = hands[currPosition].reduce(function changePicture(
      accumulator,
      currentValue
    ) {
      if (currentValue.value === "A") {
        if (accumulator + 11 < 21) {
          isSoft = true;
          return accumulator + 11;
        } else {
          return accumulator + 1;
        }
      }
      //previous value is Ace

      if (isPicture(currentValue.value)) {
        return accumulator + 10;
      }
      //need to move this out
      return accumulator + currentValue.value;
    },
    0);
    if (isSoft && count > 21) {
      isSoft = false;
      console.log(isSoft, "isSoft");
      return count - 10;
    }
    return count;
  }

  function assignHands() {
    console.log(players, "players inn assignHands");
    let rounds = 2;
    let order = [];
    let dealtHands = [];
    let updatedDrawPile = [...drawPile];
    for (let i = 0; i < rounds * players + 1; i++) {
      if (updatedDrawPile.length === 0) break;
      let currentCard = updatedDrawPile.pop();
      addtoRunningCount(currentCard);
      order.push(currentCard);
    }
    for (let j = 0; j < players + 1; j++) {
      if (j === players) {
        //dealers upcard
        dealtHands.push([order[j]]);
      } else {
        dealtHands.push([order[j], order[j + players + 1]]);
      }
    }
    setHands(dealtHands);
    setDrawPile(updatedDrawPile);
  }

  function allowShowingCardCount() {
    setShowCardCount((prev) => !prev);
  }

  function startGame() {
    setHands([]);
    setPlaying(true);
    assignHands();
    setPosition(0);
  }

  return (
    <div>
      <div className="displayArea">
        {!playing && (
          <div>
            <h2>How many players? (1-9)</h2>
            <input
              placeholder="no. of players"
              type="number"
              onChange={(e) => handlePlayerAmount(e)}
              value={players}
            />
          </div>
        )}

        {!playing && <button onClick={startGame}> Start Round</button>}
        {hands.map((hand, playerIndex) => (
          <div className="playArea">
            <div className="playerSection">
              <div className="playerCards">
                {hand.map((card, cardIndex) => (
                  <Card value={card.value} suit={card.suit} />
                ))}
              </div>
              {playerIndex !== hands.length - 1 && playerIndex === position && (
                <div>
                  <button
                    onClick={hitCards}
                    disabled={position !== playerIndex}
                  >
                    Take Card
                  </button>
                  <button onClick={stay} disabled={position !== playerIndex}>
                    Stay
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {allowReset && <button onClick={startGame}>Replay</button>}
        <button onClick={allowShowingCardCount}>Show Card Count</button>
      </div>
      {showCardCount && <h1 className="cardCount">{runningCount}</h1>}
    </div>
  );
}

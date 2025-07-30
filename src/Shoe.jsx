import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { DrawPileContext } from "./App.js";
export default function Shoe() {
  const [players, setPlayers] = useState(2);
  const [hands, setHands] = useState([]);
  const [playing, setPlaying] = useState(false);
  const { drawPile, setDrawPile } = useContext(DrawPileContext);
  const [position, setPosition] = useState(null);
  const [isDealer, setIsDealer] = useState(false);
  const [playerCardCount, setPlayerCardCount] = useState([]);
  const pictures = ["J", "Q", "K"];
  const [runningCount, setRunningCount] = useState(0);
  const isPicture = (card) => pictures.includes(card);

  //create a full deck of cards
  function numbers() {
    let numbersArray = [];
    for (let i = 2; i < 11; i++) {
      numbersArray.push(i);
    }
    return numbersArray;
  }
  let numbersOutput = numbers();
  let numbersAndPictures = ["A", ...numbersOutput, "J", "Q", "K"];
  let shapes = ["♣️", "❤️", "♠️", "♦️"];
  let shoe = 6;

  //## get all 52 x 6 card datadata✅
  //store them in a state called Draw pile✅
  //shuffle cards
  //set the number of people
  //draw cards

  //remove cards from draw pile
  //do count
  //end of hand
  //calculate remainder of draw pile

  function addtoRunningCount(card) {
    let lowCards = [2, 3, 4, 5, 6];
    let highCards = [10, "J", "Q", "K", "A"];
    console.log(runningCount, "running Count before ");
    if (lowCards.includes(card.value)) {
      console.log(card.value, "card.value low");
      setRunningCount((prev) => prev + 1);
      console.log(runningCount, "runningCount", card.value);
    } else if (highCards.includes(card.value)) {
      console.log(card.value, "card.value high");
      setRunningCount((prev) => prev - 1);
      console.log(runningCount, "runningCount", card.value);
    }
    console.log(runningCount, "runningCount", card.value);
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

  function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  function entireShoe() {
    let shoePile = [];
    let singleDeck = newDeck();
    for (let i = 0; i < shoe; i++) {
      shoePile.push(...singleDeck);
    }
    setDrawPile(shuffle(shoePile));
  }

  useEffect(() => {
    entireShoe();
  }, []);

  function calculatePlayerCardCount(currPosition) {
    const currentCardCount = countTo21(currPosition);

    // right now, the dealers cards anre overwriting the the last players count. This is because the if statements are wrong. I need to figure out how to change it.
    if (playerCardCount.length === currPosition + 1) {
      let currCardCount = [...playerCardCount];
      currCardCount.splice(currPosition, 1, currentCardCount);
      setPlayerCardCount(currCardCount);
      console.log(currentCardCount, "playerCardCount not equal length");

      console.log(playerCardCount, "playerCardCount paper");
    } else {
      console.log(currPosition, "currPosition in else");
      console.log(currentCardCount, "playerCardCount equal length");

      setPlayerCardCount([...playerCardCount, currentCardCount]);
    }
    return currentCardCount;
  }
  function hitCards() {
    let updatedDrawPile = [...drawPile];
    let dealtHands = [...hands];
    let currentCard = updatedDrawPile.pop();
    dealtHands[position].push(currentCard);
    addtoRunningCount(currentCard);
    setDrawPile(updatedDrawPile);
    setHands(dealtHands);

    let currentCardCount = calculatePlayerCardCount(position);
    console.log(currentCardCount, "outside if more");
    let currPosition = position;
    if (currentCardCount > 21) {
      console.log(currentCardCount, "inside if more");
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
    }
  }

  useEffect(() => {
    if (isDealer) {
      calculatePlayerCardCount(position);
    }
    console.log(playerCardCount, "dealers cards?");
    console.log(position, "dealers cards position?");
  }, [isDealer]);

  useEffect(() => {
    if (playerCardCount[position] === undefined) return;
    console.log(
      playerCardCount[position],
      "playerCardCound position outside 17 if"
    );
    if (playerCardCount[position] < 17) {
      let updatedDrawPile = [...drawPile];
      let dealtHands = [...hands];
      let currentCard = updatedDrawPile.pop();
      dealtHands[position].push(currentCard);
      setDrawPile(updatedDrawPile);
      setHands(dealtHands);
      console.log(
        playerCardCount[position],
        "playerCardCount[position] inside 17 if"
      );
    }

    calculatePlayerCardCount(position);
  }, [playerCardCount[position]]);

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
      console.log(position, "positionx");
      //below is calculating for last position before dealer. Figure out why
      // console.log(calculatePlayerCardCount(currPosition), "calc for dealer");
    }

    const currentCardCount = countTo21(currPosition);
    if (currentCardCount >= 21) {
      let currPosition = position + 1;
      setPosition(currPosition);
    }
  }
  function assignHands() {
    let rounds = 2;
    let order = [];
    let dealtHands = [];
    let updatedDrawPile = [...drawPile];
    for (let i = 0; i < rounds * players + 1; i++) {
      if (updatedDrawPile.length === 0) break;
      let currentCard = updatedDrawPile.pop();
      addtoRunningCount(currentCard);
      console.log(runningCount, "running count in for loop");
      order.push(currentCard);
    }
    console.log(order, "order");
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

  //Next steps:
  //we now have the cards for a round, we just have to divide it amongst players and
  //so we map over hands
  //maybe divide by rounds first? so /2? so we get all the cards for 1 round
  //so we have first round and then second round

  //on start round, we release cards

  //take extra card
  //need to take into consideration position so that you know where to add the card to
  //then let player choose to stay or take some more

  function startGame() {
    setPlaying(true);
    assignHands();
    setPosition(0);
  }
  console.log(position, "general position");
  console.log(hands, "Hands");
  // console.log(countTo21([{value: 'A'}, {value: '3'}, 'A,3']))
  console.log(hands[position], "hands[position]");
  console.log(playerCardCount, "playerCardCount");
  console.log(drawPile, "drawPile");
  console.log(runningCount, "runningCount");
  return (
    <div>
      <button onClick={startGame}> Start Round</button>

      <div className="displayArea">
        {hands.map((hand, playerIndex) => (
          <div className="playArea">
            <div className="playerSection">
              <div className="playerCards">
                {hand.map((card, cardIndex) => (
                  <Card value={card.value} suit={card.suit} />
                ))}
              </div>
              {playerIndex !== hands.length-1 && (
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
      </div>

      {/* players first cards */}
      {playing &&
        hands
          .slice(0, players)
          .map((firstCard, i) => (
            <Card value={firstCard[0].value} suit={firstCard[0].suit} />
          ))}
      {/* dealer's first card */}
      {playing &&
        hands
          .slice(players)
          .map((dealer, i) => (
            <Card value={dealer[0].value} suit={dealer[0].suit} />
          ))}
      {/* player's second card */}
      {playing &&
        hands.slice(0, players).map((secondCard, i) => (
          <div>
            <Card value={secondCard[1].value} suit={secondCard[1].suit} />
            <button onClick={hitCards} disabled={position !== i}>
              Take Card
            </button>
            <button onClick={stay} disabled={position !== i}>
              Stay
            </button>
          </div>
        ))}
    </div>
  );
}
//this one produces double hands idk why
// function releaseCards() {
//   let rounds = 2;
//   let dealtHands = [];

//   setDrawPile((currDrawPile) => {  // ✅ Functional update ensures latest state
//     let newDrawPile = [...currDrawPile];

//     for (let i = 0; i < rounds; i++) {
//       for (let j = 0; j < players; j++) {
//         if (newDrawPile.length === 0) return currDrawPile; // ✅ Prevent errors if empty

//         let currentCard = newDrawPile.pop(); // ✅ Removes last card safely
//         dealtHands.push(currentCard);
//       }
//     }

//     setHands(dealtHands); // ✅ Update hands AFTER processing all cards
//     return newDrawPile;   // ✅ Return updated draw pile
//   });
// }

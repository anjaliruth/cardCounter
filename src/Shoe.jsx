import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { DrawPileContext } from "./App.js";
export default function Shoe() {
  const [players, setPlayers] = useState(2);
  const [hands, setHands] = useState([{}]);
  const [playing, setPlaying] = useState(false);
  const { drawPile, setDrawPile } = useContext(DrawPileContext);
  const [position, setPosition] = useState(null);
  const [isDealer, setIsDealer] = useState(false);
  const [playerCardCount, setPlayerCardCount] = useState([]);
  const pictures = ["J", "Q", "K"];
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

  useEffect(()=>{


  }, [isDealer])

  function calculatePlayerCardCount(currPosition) {
    const currentCardCount = countTo21(currPosition);
    console.log(position, "position inside");



    if (playerCardCount.length === currPosition) {
      setPlayerCardCount([...playerCardCount, currentCardCount]);
      console.log(playerCardCount, "playerCardCount no length");
    } else {
      let currCardCount = playerCardCount;
      currCardCount.splice(currPosition, 1, currentCardCount);
      setPlayerCardCount(currCardCount);
      console.log(playerCardCount, "playerCardCount yes length");
    }
    return currentCardCount;
  }
  function hitCards() {
    let updatedDrawPile = [...drawPile];
    let dealtHands = [...hands];
    let currentCard = updatedDrawPile.pop();
    dealtHands[position].push(currentCard);
    setDrawPile(updatedDrawPile);
    setHands(dealtHands);
    console.log(hands, "hands");

    let currentCardCount = calculatePlayerCardCount(position);
    console.log(currentCardCount, "outside if more");
    let currPosition = position
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
    calculatePlayerCardCount(position);
    let currPosition = position+1;

    console.log(position, "position before");
    setPosition(currPosition);
    console.log(position, "position +1");
    //dealers cards
    if (currPosition === players) {
      setIsDealer(true)
      let updatedDrawPile = [...drawPile];
      let dealtHands = [...hands];
      let currentCard = updatedDrawPile.pop();
      dealtHands[position + 1].push(currentCard);
      setDrawPile(updatedDrawPile);
      setHands(dealtHands);
      console.log(position, "positionx");
      //below is calculating for last position before dealer. Figure out why
      console.log(calculatePlayerCardCount(currPosition), "calc for dealer");
    }

    const currentCardCount = countTo21(currPosition);
    if (currentCardCount > 21) {
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
    setPlaying(!playing);
    setPosition(0);
  }
  console.log(position, "general position");
  console.log(hands, "Hands");
  // console.log(countTo21([{value: 'A'}, {value: '3'}, 'A,3']))
  console.log(hands[position], "hands[position]");
  console.log(playerCardCount, "playerCardCount");
  console.log(drawPile, "drawPile");
  return (
    <div>
      <button onClick={startGame}> Start Round</button>
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

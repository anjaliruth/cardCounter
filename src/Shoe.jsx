import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { DrawPileContext } from "./App.js";
import {
  shoe,
  numbersAndPictures,
  shapes,
  isPicture,
  lowCards,
  highCards,
} from "./library.js";
export default function Shoe() {
  const [players, setPlayers] = useState(0);
  const [hands, setHands] = useState([]);
  const [playing, setPlaying] = useState(false);
  const { drawPile, setDrawPile } = useContext(DrawPileContext);
  const [position, setPosition] = useState(0);
  const [isDealer, setIsDealer] = useState(false);
  const [initialCardsOut, setInitialCardsOut] = useState(false);
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

  function handlePlayerAmount(e, number) {
    console.log(e.target.value, "e.target.value");
    setPlayers(number);
    console.log(players, "players in handlePlayerAmount");
  }

  function addtoRunningCount(card) {
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

  function drawHitCard(index) {
    let updatedDrawPile = [...drawPile];
    let dealtHands = [...hands];
    let currentCard = updatedDrawPile.pop();
    dealtHands[index].push(currentCard);
    setDrawPile(updatedDrawPile);
    setHands(dealtHands);
    return currentCard;
  }

  useEffect(() => {
    setupShoe();
  }, []);

  useEffect(() => {
    if (!hands[players] || hands[players].length === 0) return;
    if (isDealer) {
      let dealerCardCount = calculatePlayerCardCount(players);
      if (dealerCardCount < 17) {
        setTimeout(() => {
          const currentCard = drawHitCard(players);
          addtoRunningCount(currentCard);
        }, 800);
        calculatePlayerCardCount(players);
      }
      if (dealerCardCount >= 17) {
        setAllowReset(true);
        setPlaying(false);
        setIsDealer(false);
      }
    }
  }, [hands, isDealer]);

  useEffect(() => {
    if (playing) {
      assignHands();
    }
  }, [playing, players]);

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
    setTimeout(() => {
      const currentCard = drawHitCard(position);
      addtoRunningCount(currentCard);

      //moves position if player cardCount > 21
      let currentCardCount = calculatePlayerCardCount(position);
      let currPosition = position;
      if (currentCardCount >= 21) {
        currPosition = position + 1;
        setPosition(currPosition);
      }
      //dealers cards
      if (currPosition === players) {
        setIsDealer(true);
      }
    }, 800);
  }

  function stay() {
    let currPosition = position;
    calculatePlayerCardCount(currPosition);
    currPosition = position + 1;
    setPosition(currPosition);
    //dealers cards
    if (currPosition === players) {
      setIsDealer(true);
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
    let updatedDrawPile = [...drawPile];
    let dealtHands = Array(players + 1)
      .fill()
      .map(() => []);
    let totalCards = players * 2 + 1;

    function dealCard(i) {
      if (i >= totalCards || updatedDrawPile.length === 0) {
        setHands(dealtHands);
        setDrawPile(updatedDrawPile);
        setInitialCardsOut(true);
        return;
      }

      const currentCard = updatedDrawPile.pop();
      const playerIndex = i % (players + 1);
      dealtHands[playerIndex].push(currentCard);
      setHands([...dealtHands]);
      setDrawPile([...updatedDrawPile]);
      setTimeout(() => dealCard(i + 1), 800);
      addtoRunningCount(currentCard);
    }
    dealCard(0);
  }
  function allowShowingCardCount() {
    setShowCardCount((prev) => !prev);
  }
  function startGame() {
    setHands([]);
    setInitialCardsOut(false);
    setPlayerCardCount([]);
    setPosition(0);
    setPlaying(true);
  }
  let playerAmount = [1, 2, 3, 4, 5, 6];

  return (
    <div className="displayArea">
      <div className="infoSection">
        <div className="noPlayer">
          {!playing && (
            <div className="blank">
              <h2 className="noPlayerHeading">How many players?</h2>
              <h3 className="noPlayerSubheading">(1-6 players)</h3>
              {!players && (
                <div className="noPlayerButtonBox">
                  {playerAmount.map((number) => (
                    <button
                      onClick={(e) => handlePlayerAmount(e, number)}
                      value={number}
                      className="noPlayerButton"
                    >
                      {number}
                    </button>
                  ))}
                </div>
              )}
              {players ? <h3>{players} player Blackjack</h3> : null}
              {!playing && players  && !allowReset ? (
                <div className="startButtonBox">
                  <button onClick={startGame} className="startButton">
                    {" "}
                    Start Round
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
        {hands.length > 0 ? (
          <div className="playAreaContainer">
            <div className="dealerSection">
              {hands[players]?.map((card, cardIndex) => (
                <Card key={cardIndex} value={card.value} suit={card.suit} />
              ))}
            </div>

            <div className="playArea">
              {Array.from({ length: players }).map((_, playerIndex) => (
                <div className="playerSection">
                  <div className="playerCards">
                    {hands[playerIndex]?.map((card, cardIndex) => (
                      <Card value={card.value} suit={card.suit} />
                    ))}
                  </div>
                  {initialCardsOut &&
                    playerIndex !== hands.length - 1 &&
                    playerIndex === position && (
                      <div className="playerActions">
                        <button className="cardActionButton" onClick={hitCards}>
                          🥊
                        </button>
                        <button className="cardActionButton" onClick={stay}>
                          🛑
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {allowReset && !playing && <button onClick={startGame}>Replay</button>}
        <div className="cardCountBox">
          {playing && (
            <button className="cardCountButton" onClick={allowShowingCardCount}>
              {showCardCount ? "Hide Card Count" : "Show Card Count"}
            </button>
          )}
          {showCardCount && <h1 className="cardCount">{runningCount}</h1>}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import Dealer from "./Dealer.jsx";
import IndividualPlayer from "./IndividualPlayer.jsx";
import PlayerInfo from "./PlayerInfo.jsx";
import CardCount from "./CardCount.jsx";
import { DrawPileContext } from "./App.jsx";
import {
  shoe,
  numbersAndPictures,
  shapes,
  isPicture,
  lowCards,
  highCards,
} from "./library.js";
import SemiCircleText from "./SemicircleText.js";
import GameControl from "./GameControls.jsx";
export default function Shoe() {
  const [players, setPlayers] = useState(0);
  const [hands, setHands] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [drawPile, setDrawPile] = useState([]);
  const [position, setPosition] = useState(0);
  const [isDealer, setIsDealer] = useState(false);
  const [initialCardsOut, setInitialCardsOut] = useState(false);
  const [isChangePlayers, setIsChangePlayers] = useState(true);
  const [playerCardCount, setPlayerCardCount] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
  const [allowReset, setAllowReset] = useState(false);
  const [showCardCount, setShowCardCount] = useState(false);

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
    let total = 0;
    let aces = 0;
    for (let card of hands[currPosition]) {
      if (card.value === "A") {
        aces += 1;
        total += 11;
      } else if (isPicture(card.value)) {
        total += 10;
      } else {
        total += Number(card.value);
      }
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
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
    setIsChangePlayers(false);
  }

  function resetPlayers() {
    setIsChangePlayers(true);
    setPlayers(0);
  }
  console.log(playing, "playing");
  console.log(allowReset, "allowReset");
  console.log(players, "players");
  console.log(allowReset, "allowReset");
  return (
    <div className="displayArea">
      <div className="infoSection">
        <div className="noPlayer">
          {!playing && !allowReset && (
            <PlayerInfo handlePlayerAmount={handlePlayerAmount} />
          )}
          {!playing && players > 0 && !allowReset && (
            <GameControl
              playing={playing}
              players={players}
              startGame={startGame}
              showReplay={false}
              resetPlayers={resetPlayers}
            />
          )}
        </div>
         {!playing && players > 0 && allowReset && (
      <div className="resetControl" >
            <GameControl
              playing={playing}
              players={players}
              startGame={startGame}
              showReplay={true}
              resetPlayers={resetPlayers}
            />
          </div>
          )}

        {hands.length > 0 && !!players && !isChangePlayers ? (
          <div className="playAreaContainer">
            <div className="dealerSection">
              <Dealer hands={hands} players={players} />
            </div>
            <div className="semiCircle">
              <SemiCircleText text="BLACKJACK CASINO" radius={180} />
            </div>

            <div className="playArea">
              {Array.from({ length: players }).map((_, playerIndex) => (
                <div className="playerSection">
                  <div className="playerCards">
                    <IndividualPlayer
                      playerIndex={playerIndex}
                      hands={hands}
                      initialCardsOut={initialCardsOut}
                      hitCards={hitCards}
                      stay={stay}
                      position={position}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="cardCountBox">
        <CardCount playing={playing} allowShowingCardCount={allowShowingCardCount} showCardCount={showCardCount} runningCount={runningCount}/>
        </div>
      </div>
         
    </div>
  );
}

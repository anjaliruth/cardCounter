import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { DrawPileContext } from "./App.js";
export default function Shoe() {
  const [players, setPlayers] = useState(2);
  const [hands, setHands] = useState([{}]);
  const { drawPile, setDrawPile } = useContext(DrawPileContext);
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

  function NewDeck() {
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
    let singleDeck = NewDeck();
    for (let i = 0; i < shoe; i++) {
      shoePile.push(...singleDeck);
    }
    setDrawPile(shuffle(shoePile));
  }

  useEffect(() => {
    entireShoe();
  }, []);

  function releaseCards() {
    let rounds = 2;
    let dealtHands = [];
    let currentDrawPile = [...drawPile]
    for (let i = 0; i < rounds; i++) {
      for (let j = 0; j < players; j++) {
        let currentCard = currentDrawPile[currentDrawPile.length-1]
        let indCardData = { value: currentCard.value, suit: currentCard.suit };
        dealtHands.push(indCardData);
        currentDrawPile = currentDrawPile.slice(0, -1)
      }
    }
    setHands(dealtHands)
    setDrawPile(currentDrawPile)
    //for loop for rounds
    //in each round, inner for loop to go thorugh the amount of players and release a card from drawPile for them
    //use the hands to calculate count
  }
  // function releaseCards() {
  //   let rounds = 2;
  //   let dealtHands = [];

  //   for (let i = 0; i < rounds; i++) {
  //     for (let j = 0; j < players; j++) {
  //       let currentCard = drawPile[drawPile.length - 1];
  //       setDrawPile((curr) => curr.slice(0, -1));
  //       let indCardData = { value: currentCard.value, suit: currentCard.suit };
  //       dealtHands.push(indCardData);
  //     }
  //   }
  //   setHands(dealtHands)
  //   //for loop for rounds
  //   //in each round, inner for loop to go thorugh the amount of players and release a card from drawPile for them
  //   //use the hands to calculate count
  // }
  console.log(drawPile, "drawPile1");
  console.log("hello");
  console.log(hands, "Hands")
  return (
    <div>
      <button onClick={releaseCards}> Start Round</button>
    </div>
  );
}

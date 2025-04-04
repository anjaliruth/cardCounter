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

    let rounds = 2
    let dealtHands = []
      let updatedDrawPile = [...drawPile]
      for (let i = 0; i < rounds; i++){
        for (let j = 0; j < players; j++) {
          if (updatedDrawPile.length=== 0) break
          let currentCard = updatedDrawPile.pop()
          dealtHands.push(currentCard)
        }
      }
      setHands(dealtHands)
      setDrawPile(updatedDrawPile)
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

  console.log(drawPile, "drawPile1");
  console.log("hello");
  console.log(hands, "Hands")
  return (
    <div>
      <button onClick={releaseCards}> Start Round</button>
    </div>
  );
}

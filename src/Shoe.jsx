import React, { useState, useEffect} from "react";
import Card from "./Card";

export default function Shoe() {
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

  const [ drawPile, setDrawPile ] = useState([]);

  //## get all 52 x 6 card data
  //store them in a state called Draw pile
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
    for (let i = 0; i < drawPile.length; i++) {
      const j = Math.floor(Math.random()* (i+1))
      [array[i], array[j]] = [ array[j],array[i]]
    }
    return array
  }
  function entireShoe() {
    let shoePile = [];
    let singleDeck = NewDeck()
      for (let i = 0; i < shoe; i++) {
        shoePile.push(...singleDeck);
      }
      setDrawPile(shoePile)
  }


  useEffect(()=> {
      entireShoe()
  }, [])


  function startGame() {


console.log(drawPile, "drawPile")
console.log("hello")
  }
  return (
    <div>
    <button onClick={startGame}> Start Game</button>
  {drawPile.map((data, i)=> <Card value={data.value} suit={data.suit} />)}
    </div>
  );
}

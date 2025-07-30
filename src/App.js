import logo from './logo.svg';
import './App.css';
import Card from './Card';
import Shoe from './Shoe';
import { useContext, createContext, useState } from 'react';

export const DrawPileContext = createContext();
function App() {
  const [ drawPile, setDrawPile ] = useState([]);
  // create deck of cards
  //create a shoe of 6 decks
  //create draw pile
  //create discard pile
  //estimate how many decks left in the shoe
  //create player hand
  //create dealer hand
  //create count


  // next steps
 // allow for multiple players


  return (
    <div className="App">
      <DrawPileContext.Provider value={{drawPile, setDrawPile}}>
      <Shoe/>
      </DrawPileContext.Provider>
    </div>
  );
}

export default App;

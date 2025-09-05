import './App.css';
import Shoe from './Shoe';
import {createContext } from 'react';

export const DrawPileContext = createContext();
function App() {
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
      <Shoe/>
    </div>
  );
}

export default App;

import React from "react";
import { isPicture } from "./library";

export default function Card({ value, suit }) {
  const isRed = suit === "❤️" || suit === "♦️";
  const pipLayouts = {
    A: [[50, 50]],

    2: [
      [50, 35],
      [50, 65],
    ],
    3: [
      [50, 15],
      [50, 50],
      [50, 85],
    ],
    4: [
      [35, 20],
      [65, 20],
      [35, 80],
      [65, 80],
    ],
    5: [
      [35, 15],
      [65, 15],
      [50, 50],
      [35, 85],
      [65, 85],
    ],
    6: [
      [35, 15],
      [65, 15],
      [35, 50],
      [65, 50],
      [35, 85],
      [65, 85],
    ],
    7: [
      [40, 15],
      [60, 15],
      [50, 30],
      [40, 45],
      [60, 45],
      [40, 75],
      [60, 75],
    ],
    8: [
      [35, 15],
      [65, 15],
      [50, 32.5],
      [35, 50],
      [65, 50],
      [50, 67.5],
      [35, 85],
      [65, 85],
    ],
    9: [
      [35, 15],
      [65, 15],
      [35, 32.5],
      [65, 32.5],
      [50, 50],
      [35, 67.5],
      [65, 67.5],
      [35, 85],
      [65, 85],
    ],
    10: [
      [35, 15],
      [65, 15],
      [35, 40],
      [65, 40],
      [50, 27.5],
      [35, 60],
      [65, 60],
      [50, 72],
      [35, 85],
      [65, 85],
    ],
  };

  const pips = pipLayouts[value] || [[50, 50]];

  function returnPicture(value){
    if (value === 'J'){
      return '🤵'
    }
    else if (value === 'Q'){
      return '👸'
    }
    else return '🤴'
  }

  return (
    <div className="Card">
      <div className={`corner top-left ${isRed ? "red" : "black"}`}>
        <span>{value}</span>
        <span className="suitSymbol">{suit}</span>
      </div>
      <div className={`corner bottom-right ${isRed ? "red" : "black"}`}>
        <span>{value}</span>
        <span  className="suitSymbol">{suit}</span>
      </div>


      <div className="pipHolder">
      
        {pips.map(([x, y], i) => (
          <div
            key={i}
            className={`pip ${isRed ? "red" : "black"}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              fontSize: value === "A" || isPicture(value) ? "28px" : "14px",
            }}
          >
            {isPicture(value) ? returnPicture(value) : suit}
          </div>
        ))}
      </div>
    </div>
  );
}

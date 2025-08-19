import React from "react";

export default function Card({ value, suit }) {
  return (
    <div className="Card">
      <div className="cardValue">{value}</div>
      <div className="cardSuit">{suit}</div>
    </div>
  );
}

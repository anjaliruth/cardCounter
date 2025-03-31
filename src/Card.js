import React from "react";

export default function Card({ value, suit}) {
  return (
    <div className="Card">
      {value}

      {suit}
    </div>
  );
}

import React from "react";
export default function PlayerInfo({ playing, players, handlePlayerAmount }) {
  const playerAmount = [1, 2, 3, 4, 5, 6];
  return (
    <div className="noPlayer">
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
    </div>
  );
}

import React, { useEffect, useState } from "react";
export default function PlayerInfo({ playing, players, handlePlayerAmount, isPlayerChosen }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 568);
      setIsTablet(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const playerAmount = isMobile ? [1, 2] : isTablet ? [1,2,3]: [1, 2, 3, 4, 5, 6];
  console.log(players, 'players')
  console.log(!!players, '!!players')
  return (
    <div className="noPlayer">
      <h2 className="noPlayerHeading">How many players?</h2>
      {!players && (
        <div className="noPlayerButtonBox">
          {playerAmount.map((number) => (
            <button
              onClick={(e) => handlePlayerAmount(e, number)}
              value={number}
              className="noPlayerButton"
              disabled={isPlayerChosen}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

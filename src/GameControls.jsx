export default function GameControl({
  players,
  startGame,
  showReplay,
  resetPlayers,
  playing,
}) {
  return (
    <div>
      {!playing && !showReplay && <h3>{players} player Blackjack</h3>}

      {showReplay && (
        <div className="roundOverDisplay">
          <h1 className="roundOverText"> Round Over!</h1>

          <div className="roundOverButtons">
            <div className="startButtonBox">
              <button onClick={startGame} className="startButton">
                Play Again
              </button>
            </div>
            <button onClick={resetPlayers} className="startButton">
              Change amount of players
            </button>
          </div>
        </div>
      )}

      {!showReplay && (
        <div className="startButtonBox">
          <button onClick={startGame} className="startButton">
            Start Round
          </button>
        </div>
      )}
    </div>
  );
}

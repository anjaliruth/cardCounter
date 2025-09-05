export default function GameControl({
  players,
  startGame,
  showReplay,
  resetPlayers,
  playing,
}) {
  return (
    <div className="startingGameControl">
      {(!playing && !showReplay && players) ? <h3>{players} player Blackjack</h3>: null}

      {showReplay && (
        <div className="roundOverDisplay">
          <h1 className="roundOverText"> Round Over!</h1>

          <div className="roundOverButtons">
              <button onClick={startGame} className="startButton">
                Play Again
              </button>

            <button onClick={resetPlayers} className="mutedButton">
              Change Players
            </button>
          </div>
        </div>
      )}

      {!showReplay && players ? (
        <div className="startButtonBox">
          <button onClick={startGame} className="startButton">
            Start Round
          </button>
        </div>
      ): null}
    </div>
  );
}

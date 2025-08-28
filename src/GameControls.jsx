export default function GameControl({
  players,
  startGame,
  showReplay,
  resetPlayers,
  playing
}) {
  return (
    <div>
      {!playing && !showReplay && <h3>{players} player Blackjack</h3>}
      
      {showReplay && (
        <div>
          <h1> Round Over!</h1>
          <div></div>
          <div>
            <button onClick={resetPlayers}>Change amount of players?</button>
          </div>
        </div>
      )}
      <div className="startButtonBox">
        <button onClick={startGame} className="startButton">
          {showReplay ? "Play Again" : "Start Round"}
        </button>
      </div>
    </div>
  );
}

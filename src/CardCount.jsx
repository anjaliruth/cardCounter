export default function CardCount({playing,showCardCount, allowShowingCardCount, runningCount }){
    return (
        <div>
         {playing && (
            <button className="cardCountButton" onClick={allowShowingCardCount}>
              {showCardCount ? "Hide Card Count" : "Show Card Count"}
            </button>
          )}
          <h1
            className="cardCount"
            style={{
              visibility: showCardCount && playing ? "visible" : "hidden",
            }}
          >
            {runningCount}
          </h1>
          </div>
    )
}
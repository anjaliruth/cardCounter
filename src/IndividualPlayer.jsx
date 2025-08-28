import Card from "./Card";

export default function IndividualPlayer({
  playerIndex,
  hands,
  hitCards,
  initialCardsOut,
  position,
  stay,
}) {
  return (
    <div className="individualCardStack">
      <h1>Player {playerIndex + 1}</h1>
      {hands[playerIndex]?.map((card, cardIndex) => (
        <div
          key={cardIndex}
          className="positionHolder"
          style={{
            top: `${cardIndex * 15}px`,
            left: `${cardIndex * 20}px`,
          }}
        >
          <Card value={card.value} suit={card.suit} />
        </div>
      ))}
      {initialCardsOut &&
        playerIndex !== hands.length - 1 &&
        playerIndex === position && (
          <div className="playerActions">
            <button className="cardActionButton" onClick={hitCards}>
              🥊
            </button>
            <button className="cardActionButton" onClick={stay}>
              🛑
            </button>
          </div>
        )}
    </div>
  );
}

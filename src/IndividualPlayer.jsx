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
    <div className="stackAndAction">
        <h3>Player{playerIndex + 1}</h3>
      <div className="individualCardStack">
        {hands[playerIndex]?.map((card, cardIndex) => (
          <div
            key={cardIndex}
            className="positionHolder"
            style={{
              top: `${cardIndex * 5}px`,
              left: `${cardIndex * 20}px`,
            }}
          >
            <Card value={card.value} suit={card.suit} />
          </div>
        ))}
      </div>
      <div
        className="playerActions"
        style={{
          visibility:
            initialCardsOut &&
            playerIndex !== hands.length - 1 &&
            playerIndex === position
              ? "visible"
              : "hidden",
        }}
      >
        <button className="cardActionButton" onClick={hitCards}>
          🥊
        </button>
        <button className="cardActionButton" onClick={stay}>
          🛑
        </button>
      </div>
    </div>
  );
}

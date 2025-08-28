import Card from "./Card"

export default function Dealer({hands, players}) {
return(
     <div className="individualCardStack">
                    <h1>DEALER</h1>
                    {hands[players]?.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="positionHolder"
                        style={{ left: `${cardIndex * 25}px` }}
                      >
                        <Card
                          key={cardIndex}
                          value={card.value}
                          suit={card.suit}
                          style={{
                            transform: `rotate(${cardIndex * 3}deg)`,
                            marginLeft: `${cardIndex * -50}px`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
)
}
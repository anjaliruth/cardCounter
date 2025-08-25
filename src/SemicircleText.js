import React from "react";

export default function SemiCircleText({text, radius
}) {
const chars = text.split("");
const angleStep = Math.PI / (chars.length - 1);

return (
    <div
    style={{
        position: "relative",
        margin: "0 auto",
    }}
    >
    {chars.map((char, i) => {
        const angle = Math.PI - i * angleStep;

        const x = radius + radius * Math.cos(angle) * 0.9; // scale to stay inside
        const y = radius * 0.1 + radius * Math.sin(angle) * 0.9; 

        return (
        <span
            key={i}
            style={{
            position: "absolute",
            left: `${x}px`,
              top: `${y}px`,
            transform: `translate(-50%, -50%) rotate(${
                angle * (180 / Math.PI) - 90
            }deg)`,
            transformOrigin: "center",
            fontSize: "20px",
            color: "black",
            whiteSpace: "pre",

            }}
        >
            {char}
        </span>
        );
    })}

    </div>
);
}

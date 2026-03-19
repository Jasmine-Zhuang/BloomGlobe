import type { ReactNode } from "react";

import { FlowerType } from "@/lib/types";

interface FlowerArtworkProps {
  flowerType: FlowerType;
  title: string;
  className?: string;
}

const FLOWER_ART = {
  "Cherry Blossom": {
    sky: "#fff5f6",
    ground: "#f7d7db",
    petal: "#f0a8b8",
    accent: "#c77772",
  },
  Tulip: {
    sky: "#fff5ee",
    ground: "#f6d4ba",
    petal: "#df6f58",
    accent: "#b45048",
  },
  Lavender: {
    sky: "#f7f2ff",
    ground: "#d6c7f2",
    petal: "#8f77d8",
    accent: "#624b9c",
  },
  Sunflower: {
    sky: "#fff7dc",
    ground: "#f5d46c",
    petal: "#f3b328",
    accent: "#7a5418",
  },
  Rose: {
    sky: "#fff2f2",
    ground: "#f2d0d5",
    petal: "#d4687f",
    accent: "#8f3f56",
  },
  Jacaranda: {
    sky: "#f7f1ff",
    ground: "#d8c4f8",
    petal: "#8c68da",
    accent: "#5b3f9f",
  },
  "Plum Blossom": {
    sky: "#fff6fa",
    ground: "#efd7df",
    petal: "#d784a1",
    accent: "#8f5868",
  },
  Cosmos: {
    sky: "#fff8f2",
    ground: "#f3d7d9",
    petal: "#d97d9a",
    accent: "#7d8a5a",
  },
  Wildflower: {
    sky: "#fffaf2",
    ground: "#f6df95",
    petal: "#d95f7c",
    accent: "#688b5f",
  },
  Wisteria: {
    sky: "#faf7ff",
    ground: "#dcccf8",
    petal: "#ae8de6",
    accent: "#6d58ab",
  },
  Hydrangea: {
    sky: "#f3fbff",
    ground: "#bfdcf2",
    petal: "#72a9d5",
    accent: "#48779f",
  },
  Lotus: {
    sky: "#fff8f3",
    ground: "#dfeccc",
    petal: "#f0a7b7",
    accent: "#4e7b54",
  },
  Canola: {
    sky: "#fffbe3",
    ground: "#faef9c",
    petal: "#f2c738",
    accent: "#64824a",
  },
  Protea: {
    sky: "#fff6f1",
    ground: "#f0c8b4",
    petal: "#e38d76",
    accent: "#8c5647",
  },
} satisfies Record<FlowerType, { sky: string; ground: string; petal: string; accent: string }>;

function renderPetalBurst(x: number, y: number, petalColor: string, centerColor: string, petals = 8, radius = 18) {
  return (
    <g>
      {Array.from({ length: petals }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / petals;
        const petalX = x + Math.cos(angle) * radius;
        const petalY = y + Math.sin(angle) * radius;

        return (
          <ellipse
            key={`${x}-${y}-${index}`}
            cx={petalX}
            cy={petalY}
            rx="10"
            ry="18"
            fill={petalColor}
            transform={`rotate(${(angle * 180) / Math.PI + 90} ${petalX} ${petalY})`}
          />
        );
      })}
      <circle cx={x} cy={y} r="9" fill={centerColor} />
    </g>
  );
}

function renderStem(x: number, topY: number, bottomY: number, color: string) {
  return <path d={`M${x} ${bottomY} C ${x - 8} ${bottomY - 38}, ${x + 8} ${topY + 32}, ${x} ${topY}`} stroke={color} strokeWidth="4" fill="none" />;
}

function renderFlowerCluster(flowerType: FlowerType, art: (typeof FLOWER_ART)[FlowerType]): ReactNode {
  switch (flowerType) {
    case "Cherry Blossom":
      return (
        <>
          {[
            [122, 214],
            [196, 176],
            [278, 230],
            [356, 170],
            [442, 216],
            [526, 168],
            [612, 226],
            [694, 184],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 10, 370, art.accent)}
              {renderPetalBurst(x, y, art.petal, "#fff4b8", 5, 14)}
            </g>
          ))}
        </>
      );
    case "Tulip":
      return (
        <>
          {[
            [110, 220, 146],
            [188, 180, 150],
            [266, 226, 144],
            [344, 170, 154],
            [422, 214, 146],
            [500, 176, 152],
            [578, 224, 144],
            [656, 184, 150],
          ].map(([x, y, height]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 24, 370, art.accent)}
              <path d={`M${x - 22} ${y + 16} Q ${x - 12} ${y - 22} ${x} ${y - 4} Q ${x + 12} ${y - 24} ${x + 22} ${y + 16} Q ${x} ${y + height / 7} ${x - 22} ${y + 16}Z`} fill={art.petal} />
              <path d={`M${x - 12} ${y + 6} Q ${x} ${y - 26} ${x + 12} ${y + 6}`} stroke={art.accent} strokeWidth="3" fill="none" opacity="0.55" />
            </g>
          ))}
        </>
      );
    case "Lavender":
      return (
        <>
          {Array.from({ length: 10 }).map((_, index) => {
            const x = 86 + index * 68;
            const topY = 166 + (index % 3) * 16;

            return (
              <g key={x}>
                {renderStem(x, topY + 72, 376, art.accent)}
                {Array.from({ length: 6 }).map((__, innerIndex) => {
                  const budY = topY + innerIndex * 12;
                  const offset = innerIndex % 2 === 0 ? -8 : 8;

                  return (
                    <g key={`${x}-${budY}`}>
                      <ellipse cx={x + offset} cy={budY} rx="8" ry="12" fill={art.petal} opacity="0.92" />
                      <ellipse cx={x - offset / 2} cy={budY + 6} rx="7" ry="10" fill={art.petal} opacity="0.78" />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </>
      );
    case "Sunflower":
      return (
        <>
          {[
            [128, 208],
            [254, 176],
            [400, 220],
            [544, 172],
            [676, 214],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 24, 382, art.accent)}
              {Array.from({ length: 14 }).map((_, index) => {
                const angle = (Math.PI * 2 * index) / 14;
                const petalX = x + Math.cos(angle) * 28;
                const petalY = y + Math.sin(angle) * 28;

                return (
                  <ellipse
                    key={`${x}-${y}-${index}`}
                    cx={petalX}
                    cy={petalY}
                    rx="10"
                    ry="24"
                    fill={art.petal}
                    transform={`rotate(${(angle * 180) / Math.PI + 90} ${petalX} ${petalY})`}
                  />
                );
              })}
              <circle cx={x} cy={y} r="20" fill={art.accent} />
              <circle cx={x} cy={y} r="8" fill="#4d3213" opacity="0.6" />
            </g>
          ))}
        </>
      );
    case "Rose":
      return (
        <>
          {[
            [132, 222],
            [242, 178],
            [356, 230],
            [458, 182],
            [570, 226],
            [676, 190],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 22, 378, art.accent)}
              <circle cx={x} cy={y} r="22" fill={art.petal} />
              <path d={`M${x - 16} ${y + 2} C ${x - 4} ${y - 22}, ${x + 18} ${y - 10}, ${x + 8} ${y + 12} C ${x + 2} ${y + 24}, ${x - 20} ${y + 18}, ${x - 16} ${y + 2}Z`} fill="#ef97a8" opacity="0.75" />
              <path d={`M${x - 2} ${y + 14} C ${x - 18} ${y + 2}, ${x - 10} ${y - 12}, ${x + 6} ${y - 8} C ${x + 18} ${y - 2}, ${x + 14} ${y + 12}, ${x - 2} ${y + 14}Z`} fill={art.accent} opacity="0.22" />
            </g>
          ))}
        </>
      );
    case "Jacaranda":
      return (
        <>
          {[
            [126, 208],
            [220, 170],
            [318, 224],
            [410, 174],
            [502, 220],
            [592, 170],
            [684, 216],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 18, 374, art.accent)}
              <path d={`M${x} ${y - 18} C ${x + 18} ${y - 8}, ${x + 18} ${y + 20}, ${x} ${y + 30} C ${x - 18} ${y + 20}, ${x - 18} ${y - 8}, ${x} ${y - 18}Z`} fill={art.petal} />
              <path d={`M${x - 22} ${y + 2} Q ${x} ${y - 24} ${x + 22} ${y + 2}`} stroke={art.petal} strokeWidth="8" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </>
      );
    case "Wildflower":
      return (
        <>
          {[
            [98, 230, "#e06f53"],
            [170, 188, "#f0b43d"],
            [246, 236, art.petal],
            [320, 182, "#d9608e"],
            [396, 228, "#f0b43d"],
            [476, 174, "#8dbf71"],
            [554, 230, "#e06f53"],
            [628, 184, art.petal],
            [704, 232, "#f0b43d"],
          ].map(([x, y, petalColor]) => (
            <g key={`${x}-${y}`}>
              {renderStem(Number(x), Number(y) + 14, 374, art.accent)}
              {renderPetalBurst(Number(x), Number(y), String(petalColor), "#fff5c2", 7, 14)}
            </g>
          ))}
        </>
      );
    case "Wisteria":
      return (
        <>
          {[
            [118, 150],
            [224, 126],
            [332, 158],
            [438, 120],
            [548, 154],
            [656, 128],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <path d={`M${x} 98 C ${x - 16} 132, ${x + 10} ${y - 10}, ${x} ${y}`} stroke={art.accent} strokeWidth="4" fill="none" />
              {Array.from({ length: 7 }).map((_, index) => (
                <ellipse
                  key={`${x}-${y}-${index}`}
                  cx={x + (index % 2 === 0 ? -8 : 8)}
                  cy={y + index * 18}
                  rx="12"
                  ry="16"
                  fill={art.petal}
                  opacity={1 - index * 0.08}
                />
              ))}
            </g>
          ))}
        </>
      );
    case "Hydrangea":
      return (
        <>
          {[
            [142, 240],
            [288, 188],
            [420, 230],
            [554, 182],
            [684, 236],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 38, 382, art.accent)}
              {[
                [0, 0],
                [-26, -10],
                [22, -14],
                [-18, 18],
                [20, 20],
                [0, -28],
              ].map(([dx, dy], index) => (
                <g key={`${x}-${y}-${index}`}>
                  <rect x={x + dx - 10} y={y + dy - 10} width="20" height="20" rx="7" fill={art.petal} />
                  <rect x={x + dx - 3} y={y + dy - 16} width="6" height="32" rx="3" fill={art.petal} opacity="0.82" />
                </g>
              ))}
            </g>
          ))}
        </>
      );
    case "Lotus":
      return (
        <>
          {[
            [146, 254],
            [294, 208],
            [432, 248],
            [570, 202],
            [690, 246],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <path d={`M${x} 378 C ${x - 8} 330, ${x + 4} ${y + 18}, ${x} ${y}`} stroke={art.accent} strokeWidth="4" fill="none" />
              <ellipse cx={x} cy={y + 30} rx="44" ry="12" fill="#a8c48e" opacity="0.8" />
              <path d={`M${x} ${y - 24} C ${x + 20} ${y - 2}, ${x + 20} ${y + 26}, ${x} ${y + 36} C ${x - 20} ${y + 26}, ${x - 20} ${y - 2}, ${x} ${y - 24}Z`} fill={art.petal} />
              <path d={`M${x - 24} ${y + 12} Q ${x} ${y - 18} ${x + 24} ${y + 12}`} stroke="#f6c4d1" strokeWidth="10" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </>
      );
    case "Canola":
      return (
        <>
          {Array.from({ length: 10 }).map((_, index) => {
            const x = 88 + index * 68;
            const y = 188 + (index % 4) * 10;

            return (
              <g key={`${x}-${y}`}>
                {renderStem(x, y + 24, 378, art.accent)}
                {[
                  [0, 0],
                  [-16, 14],
                  [16, 16],
                  [-10, -16],
                  [14, -12],
                ].map(([dx, dy], innerIndex) => (
                  <g key={`${x}-${y}-${innerIndex}`}>
                    <circle cx={x + dx} cy={y + dy} r="8" fill={art.petal} />
                    <circle cx={x + dx - 8} cy={y + dy} r="5" fill={art.petal} opacity="0.85" />
                    <circle cx={x + dx + 8} cy={y + dy} r="5" fill={art.petal} opacity="0.85" />
                    <circle cx={x + dx} cy={y + dy - 8} r="5" fill={art.petal} opacity="0.85" />
                    <circle cx={x + dx} cy={y + dy + 8} r="5" fill={art.petal} opacity="0.85" />
                  </g>
                ))}
              </g>
            );
          })}
        </>
      );
    case "Protea":
      return (
        <>
          {[
            [144, 236],
            [278, 186],
            [408, 228],
            [540, 182],
            [674, 232],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              {renderStem(x, y + 22, 380, art.accent)}
              {Array.from({ length: 12 }).map((_, index) => {
                const angle = (Math.PI * 2 * index) / 12;
                const petalX = x + Math.cos(angle) * 18;
                const petalY = y + Math.sin(angle) * 18;

                return (
                  <path
                    key={`${x}-${y}-${index}`}
                    d={`M${petalX} ${petalY} Q ${x + Math.cos(angle) * 34} ${y + Math.sin(angle) * 34} ${x + Math.cos(angle) * 20} ${y + Math.sin(angle) * 20}`}
                    stroke={art.petal}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                );
              })}
              <ellipse cx={x} cy={y} rx="22" ry="26" fill="#f2bea9" />
              <ellipse cx={x} cy={y} rx="10" ry="14" fill={art.accent} opacity="0.28" />
            </g>
          ))}
        </>
      );
    default:
      return null;
  }
}

export function FlowerArtwork({ flowerType, title, className }: FlowerArtworkProps) {
  const art = FLOWER_ART[flowerType];
  const gradientId = flowerType.toLowerCase().replace(/\s+/g, "-");

  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      role="img"
      aria-label={`${title} ${flowerType} artwork`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${gradientId}-sky`} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={art.sky} />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={`${gradientId}-field`} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={art.ground} />
          <stop offset="100%" stopColor="#f6efe8" />
        </linearGradient>
      </defs>

      <rect width="800" height="520" fill={`url(#${gradientId}-sky)`} />
      <circle cx="620" cy="112" r="88" fill="rgba(255,255,255,0.7)" />
      <path d="M0 356C104 314 188 332 288 364s174 28 260 0 166-36 252 0v156H0Z" fill={`url(#${gradientId}-field)`} />
      <path d="M0 404c116-22 212-8 308 18s198 34 298 8 136-20 194-4v94H0Z" fill="rgba(255,255,255,0.26)" />

      <g opacity={0.97}>{renderFlowerCluster(flowerType, art)}</g>

      <g opacity="0.28" fill={art.accent}>
        <circle cx="118" cy="124" r="8" />
        <circle cx="152" cy="104" r="5" />
        <circle cx="178" cy="132" r="6" />
        <circle cx="686" cy="164" r="6" />
        <circle cx="712" cy="132" r="8" />
      </g>
    </svg>
  );
}

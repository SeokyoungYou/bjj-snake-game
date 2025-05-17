import { BeltRank } from "@/types/game";

export const BELTS = [
  {
    name: "White",
    rank: BeltRank.WHITE,
    color: "#ffffff",
    stripeColor: "#ffffff",
    bgColor: "#f0f0f0",
    gridColor: "#ddd",
    snakeColor: "#000000",
    eyeColor: "#000000",
  },
  {
    name: "Blue",
    rank: BeltRank.BLUE,
    color: "#2563eb",
    stripeColor: "#ffffff",
    bgColor: "#e6f0ff",
    gridColor: "#b3d1ff",
    snakeColor: "#000000",
    eyeColor: "#ffffff",
  },
  {
    name: "Purple",
    rank: BeltRank.PURPLE,
    color: "#9333ea",
    stripeColor: "#ffffff",
    bgColor: "#f0e6ff",
    gridColor: "#d1b3ff",
    snakeColor: "#000000",
    eyeColor: "#ffffff",
  },
  {
    name: "Brown",
    rank: BeltRank.BROWN,
    color: "#92400e",
    stripeColor: "#ffffff",
    bgColor: "#fff0e6",
    gridColor: "#ffcc99",
    snakeColor: "#000000",
    eyeColor: "#ffffff",
  },
  {
    name: "Black",
    rank: BeltRank.BLACK,
    color: "#000000",
    stripeColor: "#ffffff",
    bgColor: "#e6e6e6",
    gridColor: "#bbb",
    snakeColor: "#ff0000",
    eyeColor: "#ffffff",
  },
] as const;

export const SPECIAL_ITEMS = [
  "Armbar", // Breaks through obstacles
  "Triangle", // Temporary invincibility
  "Choke", // Can defeat bosses
  "Ankle Lock", // Can defeat bosses
];

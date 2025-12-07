import { type GameState } from "../types/game-types";



// type TrickColor = 'white' | 'black';

// type GameTrick = {
//   id: number;
//   color: TrickColor;
//   currentSlotId: number;
// }

// type GameSlot = {
//   slotId: number;
//   gameTricks: GameTrick[];
// };

// type GameState = GameSlot[];

export const initialGameState: GameState = [
  {
    slotId: 1, gameTricks: [
      { id: 1, color: 'white', _currentSlot: 1 },
      { id: 2, color: 'black', _currentSlot: 1 },
      { id: 3, color: 'white', _currentSlot: 1 },
      { id: 4, color: 'black', _currentSlot: 1 },
      { id: 5, color: 'white', _currentSlot: 1 },
      { id: 6, color: 'black', _currentSlot: 1 },
      { id: 7, color: 'white', _currentSlot: 1 },
      { id: 8, color: 'black', _currentSlot: 1 },
      { id: 9, color: 'white', _currentSlot: 1 }
    ]
  },
  { slotId: 2, gameTricks: [] },
  { slotId: 3, gameTricks: [] }
];

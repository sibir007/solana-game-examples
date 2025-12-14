export type TrickColor = 'white' | 'black';

export type GameTrick = {
  id: number;
  color: TrickColor;
  currentSlotId: number;
}

export type GameSlot = {
  slotId: number;
  gameTricks: GameTrick[];
};

export type GameState = GameSlot[];

export interface TrickProps{
  id: number;
  color: string;
  disabled?: boolean;
  currentSlotId: number
}

export interface GameStackProps{
  id: number;
  drgTirckDisabled?: boolean;
  
}




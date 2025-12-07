import React, { forwardRef } from 'react';
import { DndContext } from '@dnd-kit/core';
import {Flex, Grid, HStack } from '@chakra-ui/react';

export function Board({ children }: React.PropsWithChildren<{}>) {

  // const dndContext = useDndContext();



  return (
    // <DndContext>

    <Flex minH='200'>
      {children}
    </Flex>
    // </DndContext>
  );

  // function handleDragEnd(event: DragEndEvent) {
  //   const { id, over } = event;
  //   console.log("drag end", id, over.id);

  //   if (!over) {
  //     return;
  //   }

  //   let fromSlotId: number = gameState.find((slot) =>
  //     slot.gameTricks.find((trick) => trick.id === id)
  //   ).slotId;

  //   if (fromSlotId.toString() === over.id) {
  //     return;
  //   }

  //   let newGameState: GameState = getNewGameState(gameState);
  //   let fromSlot: GameSlot = newGameState.find((slot) =>
  //     slot.gameTricks.find((trick) => trick.id === id)
  //   )!;

  //   let toSlot: GameSlot = newGameState.find((slot) => slot.slotId.toString() === over.id)!;

  //   let muvedTrick: GameTrick = fromSlot.gameTricks.find((trick) => trick.id === id)!;
  //   muvedTrick.currentSlotId = toSlot.slotId;

  //   fromSlot.gameTricks.filter((trick) => trick.id !== id);
  //   toSlot.gameTricks.push(muvedTrick);

  //   setGameState(newGameState);
  // }

  // // TODO: implement this function for deep copy
  // function getNewGameState(oldGameState: GameState): GameState {
  //   let newGameState = [...oldGameState];

  //   return newGameState;
  // }


}
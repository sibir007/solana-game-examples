import React, { forwardRef } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Center, Flex, Grid, HStack, Text } from '@chakra-ui/react';
// import { SlotNumber } from './SlotNumber';
import { BOARD_LINE, CONVERTED_BOARD } from '@/types/gui-types';
import { DroppableGemeStack, DraggableTrick } from './DNDComponents';

export function BoardAndOut({ convertedBoard }: React.PropsWithChildren<{ convertedBoard: CONVERTED_BOARD }>): React.JSX.Element {

  return (
    <Flex gap={2} px={3} bg='orange.500'> {/* BOARD and OUT */}
      <Board convertedBoard={convertedBoard}></Board>
      <BoardLine line={convertedBoard.out} key={1} drgTirckDisabled={true}></BoardLine> {/* OUT*/}
    </Flex>
  );
}

function Board({ convertedBoard }: React.PropsWithChildren<{ convertedBoard: CONVERTED_BOARD }>): React.JSX.Element {
  return (
    <Flex align='stretch' gap={4}> {/* BOARD */}
      <BoardSide convertedBoard={convertedBoard} side='left'></BoardSide> {/* BOARD LEFT SIDE */}
      <BoardSide convertedBoard={convertedBoard} side='right'></BoardSide> {/* BOARD RIGHT SIDE*/}
    </Flex>
  )
}




function BoardSide({ convertedBoard, side }: React.PropsWithChildren<{ convertedBoard: CONVERTED_BOARD, side: 'left' | 'right' }>): React.JSX.Element {
  const s = side === 'left' ? convertedBoard.left : convertedBoard.right
  return (
    <Flex align='stretch'>
      {s.map((line, i) => (
        <BoardLine line={line} key={i}></BoardLine>
      ))}
    </Flex>
  )
}

export function SlotNumber({children}: React.PropsWithChildren<{}>) {
    return (
        <Center>
            <Text fontSize='xs' textColor='white'>
                { children }
            </Text>
        </Center>
    )
}

function BoardLine({ line,  drgTirckDisabled}: React.PropsWithChildren<{ line: BOARD_LINE, drgTirckDisabled?: boolean}>) {

  return (
    <Flex direction='column'> {/*LINE*/}
      <SlotNumber>
        {line[0].slotBordPosition}
      </SlotNumber>
      <Flex h='265px' direction='column' justify='space-between' align='center' bg='orange.200'>
        < DroppableGemeStack key={line[0].slotBordPosition} id={line[0].slotBordPosition} drgTirckDisabled={drgTirckDisabled} >
          {
            line[0].gameTricks.map((trick) => (
              // console.log("trick", trick),
              <DraggableTrick
                key={trick.id}
                id={trick.id}
                color={line[0].blockOnColor!}
                disabled={false}
                currentSlotId={line[0].slotBordPosition}
              >
                T
              </DraggableTrick>
            ))
          }
        </DroppableGemeStack>
        {/* <Spacer /> */}
        < DroppableGemeStack key={line[1].slotBordPosition} id={line[1].slotBordPosition} >
          {
            line[1].gameTricks.map((trick) => (
              // console.log("trick", trick),
              <DraggableTrick
                key={trick.id}
                id={trick.id}
                color={line[1].blockOnColor!}
                disabled={false}
                currentSlotId={line[1].slotBordPosition}
              >
                T
              </DraggableTrick>
            ))
          }
        </DroppableGemeStack>
      </Flex>
      <SlotNumber>
        {line[1].slotBordPosition}
      </SlotNumber>
    </Flex>
  )
}

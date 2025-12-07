import React, {forwardRef} from 'react';
import {useDroppable, UseDroppableArguments} from '@dnd-kit/core';
import { VStack, GridItem, Flex } from '@chakra-ui/react';
import { GameStackProps } from '../../../types/game-types';

export function DroppableGemeStack(props: React.PropsWithChildren<GameStackProps>) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  const style = {'color': undefined};
  // const style = {'color': isOver ? 'green' : undefined};
  
  
  return (
    <VStack  ref={setNodeRef} spacing='1' style={style} minW='12' border='2px solid black' borderRadius='md' >
      {props.children}
    </VStack>
  );
}
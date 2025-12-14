import React, { forwardRef } from 'react';
import { useDraggable, useDroppable, UseDroppableArguments } from '@dnd-kit/core';
import { VStack, GridItem, Flex, Circle, Box, Button } from '@chakra-ui/react';
import { GameStackProps, TrickProps } from '../../../types/game-types';
// import React from 'react';

export function DroppableGemeStack(props: React.PropsWithChildren<GameStackProps>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = { 'color': undefined };
  // const style = {'color': isOver ? 'green' : undefined};


  return (
    <Flex w='5' minH='5' direction='column' ref={setNodeRef} style={style} borderRadius='md' align='center' >
      {props.children}
    </Flex>
  );
}


export function DraggableTrick({ id, disabled, color, currentSlotId, ...rest }: React.PropsWithChildren<TrickProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: disabled || false,
    data: {currentSlotId: currentSlotId}
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  // console.log(color)


  return (
    <Box ref={setNodeRef} overflow='hidden'   w='4' h='4' borderRadius='50%' bg={color} style={style} {...listeners} {...attributes} >

      {/* <Circle >
        {rest.children}
      </Circle> */}
    </Box>
  );
}

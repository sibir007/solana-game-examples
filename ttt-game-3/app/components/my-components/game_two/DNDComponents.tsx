import React, {forwardRef} from 'react';
import {useDraggable, useDroppable, UseDroppableArguments} from '@dnd-kit/core';
import { VStack, GridItem, Flex, Circle } from '@chakra-ui/react';
import { GameStackProps, TrickProps } from '../../../types/game-types';
// import React from 'react';

export function DroppableGemeStack(props: React.PropsWithChildren<GameStackProps>) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  const style = {'color': undefined};
  // const style = {'color': isOver ? 'green' : undefined};
  
  
  return (
    <Flex grow='1' direction='column' ref={setNodeRef} style={style} w='6' border='2px solid black' borderRadius='md' >
      {props.children}
    </Flex>
  );
}


export function DraggableTrick({ id, disabled, color, ...rest }: React.PropsWithChildren<TrickProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: disabled || false,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (

    <Circle ref={setNodeRef} size='5' bg={color} style={style} {...listeners} {...attributes}>
      {/* {rest.children} */}
    </Circle>
  );
}

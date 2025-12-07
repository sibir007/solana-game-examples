import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Circle, Center, Flex, Button } from '@chakra-ui/react';
import { TrickProps } from '../../../types/game-types';


export function DraggableTrick({id, disabled, color, ...rest}: React.PropsWithChildren<TrickProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: disabled || false,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (

    <Button ref={setNodeRef} borderRadius='full' boxSize='10' bg={color}  style={style} {...listeners} {...attributes}>
      {rest.children}
    </Button>
  );
}
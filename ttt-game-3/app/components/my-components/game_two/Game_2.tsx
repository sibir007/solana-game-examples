import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board } from "@/components/my-components/game_two/Board";
import { DraggableTrick } from './DNDComponents';
import { DroppableGemeStack } from "@/components/my-components/game_two/DNDComponents";
import { useGameState } from "@/contexts/TTTGameStateProvider_2";
// import { GameSlot, GameState, GameTrick } from "@/types/game-types";
import { Button, HStack, Input, InputGroup, InputRightElement, VStack, Wrap, WrapItem, Text, Center, Grid, GridItem } from "@chakra-ui/react";

import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { useToast } from '@chakra-ui/react'
import { Game, GameSlot } from "@/types/game";
import { SlotNumber } from "./SlotNumber";





export function Game_2() {
    const { gameState: game } = useGameState();
    const [gameState, setGameState] = useState(game?.clone());
    const [localPlayerID, setLocalPlayerID] = useState('')
    const [remotePlayerID, setRemotePlayerID] = useState('')
    const toast = useToast();

    function handleChangeInputLocalPlayerID(event: ChangeEvent<HTMLInputElement>): void {
        setLocalPlayerID(event.target.value);
    }
    function handleChangeInputRemotePlayerID(event: ChangeEvent<HTMLInputElement>): void {
        setRemotePlayerID(event.target.value);
    }

    function handleClickSetLocalPlayer(): void {
        try {
            game?.acceptGame(localPlayerID);
            // const newGameState = gameState;
            const newGameState = game?.clone();
            setGameState(newGameState!);
            toast({
                title: "Local player set",
                description: `Local player ID set to ${localPlayerID}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error setting local player",
                description: (error as Error).message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            console.error("Error setting local player:", error);
        }

    }

    function handleClickSetRemotePlayer(): void {
        try {
            game?.setRemotePlayer(remotePlayerID);
            const newGameState = game?.clone();
            setGameState(newGameState);
            toast({
                title: "Remote player set",
                description: `Remote player ID set to ${localPlayerID}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error setting remote player",
                description: (error as Error).message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            console.error("Error setting remote player:", error);
        }

    }

    function handlePrioritizationByFirstPlayer(): void {
        try {
            game?.prioritizationByFirstPlayer(gameState!.firstPlayer?.id!);
            const newGameState = game?.clone();
            setGameState(newGameState);
            toast({
                title: "Prioritization by first player done",
                description: `Prioritization by first player completed`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error in prioritization by first player",
                description: (error as Error).message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            console.error("Error in prioritization by first player:", error);
        }
    }

    function handlePrioritizationBySecondPlayer(): void {
        try {
            game?.prioritizationBySecondPlayer(gameState!.secondPlayer?.id!);
            const newGameState = game?.clone();
            setGameState(newGameState);
            toast({
                title: "Prioritization by second player done",
                description: `Prioritization by second player completed`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error in prioritization by second player",
                description: (error as Error).message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            console.error("Error in prioritization by second player:", error);
        }
    }

    function handleRoollCubes(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Text>Game Component</Text>
            <Grid
                templateColumns='repeat(3, 1fr)'
                templateRows='repeat(2, 1fr)'
                gap={1}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <SlotNumber>bo</SlotNumber>
                    <DroppableGemeStack id={gameState?.GameBoard.top.bottomExit.slotBordPosition!}> // bottomExit
                        {gameState?.GameBoard.top.bottomExit.gameTricks.map((trick) => (
                            <DraggableTrick
                                key={trick.id}
                                id={trick.id}
                                color={trick.color}
                                disabled={false}
                            >
                                T
                            </DraggableTrick>
                        ))}

                    </DroppableGemeStack>
                    <SlotNumber>bo</SlotNumber>
                </GridItem>
                <VStack>
                    <HStack>  // game bord top
                        <HStack> // bottomHouse
                            {(Object.values(gameState?.GameBoard.top.bottomHouse!)).map((slot) => (
                                <VStack>
                                    <SlotNumber>
                                        {slot.slotBordPosition}
                                    </SlotNumber>
                                    < DroppableGemeStack key={slot.slotBordPosition} id={slot.slotBordPosition} >
                                        {
                                            slot.gameTricks.map((trick) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trick.id}
                                                    id={trick.id}
                                                    color={trick.color}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                </VStack>
                            ))}

                        </HStack>
                        <HStack> // bottomCourtyard
                            {(Object.values(gameState?.GameBoard.top.bottomCourtyard!)).map((slot) => (
                                <VStack>
                                    <SlotNumber>
                                        {slot.slotBordPosition}
                                    </SlotNumber>
                                    < DroppableGemeStack key={slot.slotBordPosition} id={slot.slotBordPosition} >
                                        {
                                            slot.gameTricks.map((trick) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trick.id}
                                                    id={trick.id}
                                                    color={trick.color}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                </VStack>
                            ))}
                        </HStack>

                    </HStack>
                    <HStack>  // game bord bottom
                        <HStack> // topCourtyard
                            {(Object.values(gameState?.GameBoard.bottom.topCourtyard!)).sort((a, b) => -(a.slotBordPosition - b.slotBordPosition)).map((slot) => (
                                <VStack>
                                    < DroppableGemeStack key={slot.slotBordPosition} id={slot.slotBordPosition} >
                                        {
                                            slot.gameTricks.map((trick) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trick.id}
                                                    id={trick.id}
                                                    color={trick.color}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                    <SlotNumber>{slot.slotBordPosition}</SlotNumber>
                                </VStack>
                            ))}
                        </HStack>
                        <HStack> // topHouse
                            {(Object.values(gameState?.GameBoard.bottom.topHouse!)).sort((a, b) => -(a.slotBordPosition - b.slotBordPosition)).map((slot) => (
                                <VStack>
                                    < DroppableGemeStack key={slot.slotBordPosition} id={slot.slotBordPosition} >
                                        {
                                            slot.gameTricks.map((trick) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trick.id}
                                                    id={trick.id}
                                                    color={trick.color}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                    <SlotNumber>{slot.slotBordPosition}</SlotNumber>
                                </VStack>
                            ))}
                        </HStack>
                    </HStack>
                </VStack>
                <VStack>
                    <SlotNumber>to</SlotNumber>
                    <DroppableGemeStack id={gameState?.GameBoard.bottom.topExit.slotBordPosition!}> // topExit
                        {gameState?.GameBoard.bottom.topExit.gameTricks.map((trick) => (
                            <DraggableTrick
                                key={trick.id}
                                id={trick.id}
                                color={trick.color}
                                disabled={false}
                            >
                                T
                            </DraggableTrick>
                        ))}
                    </DroppableGemeStack>
                    <SlotNumber>to</SlotNumber>
                </VStack>
            </Grid>
            <Wrap spacing={4}>
                <WrapItem>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type='text'
                            value={localPlayerID}
                            placeholder='Enter LocalPlayer ID'
                            onChange={handleChangeInputLocalPlayerID}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button onClick={handleClickSetLocalPlayer}>
                                setLocalPlayer
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </WrapItem>
                <WrapItem>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type='text'
                            value={remotePlayerID}
                            placeholder='Enter RemotePlayer ID'
                            onChange={handleChangeInputRemotePlayerID}

                        />
                        <InputRightElement width='4.5rem'>
                            <Button onClick={handleClickSetRemotePlayer}>
                                setRemotePlayer
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </WrapItem>
                <WrapItem>
                    <Button onClick={handlePrioritizationByFirstPlayer}>prioritizationByFirstPlayer</Button>
                </WrapItem>
                <WrapItem>
                    <Button onClick={handlePrioritizationBySecondPlayer}>prioritizationBySecondPlayer</Button>
                </WrapItem>
                <WrapItem>
                    <Button>roollCubes</Button>
                </WrapItem>
                <WrapItem>
                    <Button>moveTrick</Button>
                </WrapItem>
            </Wrap>
        </DndContext >
    );

    // function handleDragEnd(event: DragEndEvent) { }

    function handleDragEnd(event: DragEndEvent) {
        // console.log("drag end");
        const { active, over } = event;
        if (!over) {
            return;
        }
        // console.log("drag end", active.id, over.id);

        const activTrick = game!.trickSets.getTrickById(active.id.valueOf() as number)!;
        const fromSlotId = activTrick?.currentSlot!;
        if (fromSlotId === over.id) {
            return;
        }
        const fromSlot = game!.GameBoard.getSlotByBordPosition(fromSlotId)!
        // const fromSlot = game!.GameBoard.getSlotByBordPosition(fromSlotId)!

        const toSlot: GameSlot = game!.GameBoard.getSlotByBordPosition(over.id as number)!

        toSlot.addTrick(activTrick)
        fromSlot.removeTrick(activTrick)

        setGameState(game?.clone())


    }

    // function getNewGameState<T>(obj: T): T {
    //     if (typeof obj !== 'object' || obj === null) {
    //         return obj;
    //     }
    //     const res: any = Array
    //         .isArray(obj) ? [] : {};
    //     for (const key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             res[key] = getNewGameState(obj[key]);
    //         }
    //     }
    //     return Object.assign(res, obj) as T;
}

function deepCopy<T>(instance: T): T {
    if (instance == null) {
        return instance;
    }

    // handle Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // handle Functions
    if (instance instanceof Function) {
        console.log('function', instance)
        return instance as any;
    }

    // handle Array types
    if (instance instanceof Array) {
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value) => { cloneArr.push(value) });
        // for nested objects
        return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
    }
    // handle objects
    if (instance instanceof Object) {
        var copyInstance = {
            ...(instance as { [key: string]: any }
            )
        } as { [key: string]: any };
        for (var attr in instance) {
            console.log("attr", attr);
            if ((instance as Object).hasOwnProperty(attr))
                copyInstance[attr] = deepCopy<any>((instance as any)[attr]);
        }
        return copyInstance as T;
    }
    // handling primitive data types
    return instance;
}


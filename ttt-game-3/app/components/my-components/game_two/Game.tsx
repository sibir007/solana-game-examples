import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableTrick } from './DNDComponents';
import { DroppableGemeStack } from "@/components/my-components/game_two/DNDComponents";
import { useGameState, game } from "@/contexts/TTTGameStateProvider_2";
import { Button, HStack, Input, InputGroup, InputRightElement, VStack, Wrap, WrapItem, Text, Center, Flex, Spacer, Box, ButtonGroup, FormControl, FormLabel, Tag, TagLabel, Badge } from "@chakra-ui/react";

import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { useToast } from '@chakra-ui/react'
import { type GameStateForUI, type GameLineForUI, GameSlotForUI } from "@/types/game_2";
import { SlotNumber } from "./SlotNumber";
import { useWallet } from "@solana/wallet-adapter-react"
import { BOARD_HALF, CONVERTED_BOARD, CONVERTING_SCHEME_BOARD } from "@/types/gui-types";
import { BoardAndOut } from "./Board";





export function GameComponent() {
    const { gameState, setGameState } = useGameState();
    const [firstPlayerID, setFirstPlayerID] = useState('');
    const [secondPlayerID, setSecondPlayerID] = useState('');
    const toast = useToast();
    const [LOCAL_PLAYER_ID, setLocalPlayerId] = useState('');
    const [REMOTE_PLAYER_ID, setRemotePlayerId] = useState('');

    const remotePlayerId = 'remote'
    const localPlayerId = 'local';

    // game global state
    const GAME_STATE = gameState.state;
    const FIRST_PLAYER_ID = gameState?.GameBoard.players.gamePlayers.first?.id;
    const SECOND_PLAYER_ID = gameState?.GameBoard.players.gamePlayers.second?.id;
    const CUBE_1 = gameState?.cube1State;
    const CUBE_2 = gameState?.cube2State;
    const CURRENT_PLAYER_ID = gameState?.currentPlayerIdToMakeMove;
    const MOVE_COUNT = gameState?.moveCount;
    const convertedBoard: CONVERTED_BOARD = convertGameLine(gameState.GameBoard.gameBordLine.gameBordLine, LOCAL_PLAYER_ID, FIRST_PLAYER_ID || LOCAL_PLAYER_ID)
    // convertedBoard.left[1][0].gameTricks

    function handleChangeInputFirstPlayerID(event: ChangeEvent<HTMLInputElement>): void {
        setFirstPlayerID(event.target.value);
    }
    function handleChangeInputSecondPlayerID(event: ChangeEvent<HTMLInputElement>): void {
        setSecondPlayerID(event.target.value);
    }


    function prioritizeLocal(): void {
        try {
            game.determinePlayersTurnOrder(localPlayerId);
            const newGameState = game.cloneForUI();
            setGameState(newGameState);
            toast({
                title: "Prioritization by local player done",
                // description: `Prioritization by local player completed`,
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error in prioritization by locla player",
                description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            console.error("Error in prioritization by local player:", error);
        }
    }

    function prioritizeRemote(): void {
        try {
            game?.determinePlayersTurnOrder(remotePlayerId);
            const newGameState = game.cloneForUI();
            setGameState(newGameState);
            toast({
                title: "Prioritization by remote player done",
                // description: `Prioritization by remote player completed`,
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error in prioritization by remote player",
                description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            console.error("Error in prioritization by remote player:", error);
        }
    }

    function handleRoollCubes(): void {
        try {

            game.roollCubes(CURRENT_PLAYER_ID!);
            setGameState(game.cloneForUI());
            toast({
                title: "Roll done",
                // description: `Roll completed`,
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error in roll",
                description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            console.error("Error in roll:", error);
        }
    }

    // function handleClickRemove(): void {
    //     game.removeWhait();
    //     setGameState(game.cloneForUI())
    // }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        // console.log(active.data.current?.currentSlotId);
        if (!over) {
            return;
        }
        if (active.data.current?.currentSlotId === over.id) {
            return
        }
        // console.log("drag end", active.id, over.id);
        try {

            game?.moveTrick(CURRENT_PLAYER_ID!, active.id as number, active.data.current?.currentSlotId, over.id as number)
            setGameState(game.cloneForUI())
            toast({
                title: "Move done",
                // description: `Move completed`,
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error in moveTrick",
                description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            console.error("Error in moveTrick:", error);
        }


    }

    function acceptLocal(): void {
        if (LOCAL_PLAYER_ID) {
            toast({
                title: "Local player already accept game",
                // description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            return
        }
        try {
            game.acceptGame(localPlayerId);
            setLocalPlayerId(localPlayerId)
            const newGameState = game.cloneForUI();
            setGameState(newGameState!);
            toast({
                title: `Local player ID set to ${localPlayerId}`,
                // description: `Local player ID set to ${localPlayerId}`,
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error local player game accept",
                description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            console.error("Error local player game accept:", error);
        }
    }

    function acceptRemote(): void {
        if (REMOTE_PLAYER_ID) {
            toast({
                title: "Remote player already accept game",
                // description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            return
        }
        try {
            game.acceptGame(remotePlayerId);
            setRemotePlayerId(remotePlayerId)
            const newGameState = game.cloneForUI();
            setGameState(newGameState!);
            toast({
                title: `Remot player ID set to ${remotePlayerId}`,
                // description: `Remote player ID set to ${remotePlayerId}`,
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error remote player game accept",
                description: (error as Error).message,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            console.error("Error local player game accept:", error);
        }
    }

    return (

        <VStack>

            <Flex gap={2} align='center'>
                <DndContext onDragEnd={handleDragEnd}>
                    <BoardAndOut convertedBoard={convertedBoard}></BoardAndOut>
                </DndContext >
                <Flex direction='column' gap='2'>
                    <Flex direction='column' gap='1'> {/* STATE */}
                        <Flex align='center'>
                            <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                <TagLabel>GAME STATE</TagLabel>
                            </Tag>
                            <Badge size='lg'>{GAME_STATE}</Badge>
                        </Flex>
                        <Flex gap={2}>
                            <Flex align='center' direction='column'>
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <TagLabel>LOCAL PLAYER</TagLabel>
                                </Tag>
                                <Badge size='lg'>{LOCAL_PLAYER_ID ? LOCAL_PLAYER_ID : "undefined"}</Badge>
                            </Flex>
                            <Flex align='center' direction='column'>
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <TagLabel>REMOTE PLAYER</TagLabel>
                                </Tag>
                                <Badge size='lg'>{REMOTE_PLAYER_ID ? REMOTE_PLAYER_ID : "undefined"}</Badge>
                            </Flex>

                        </Flex>
                        <Flex gap={2}>
                            <Flex align='center' direction='column'>
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <TagLabel>FIRST PLAYER ID</TagLabel>
                                </Tag>
                                <Badge size='lg'>{FIRST_PLAYER_ID ? FIRST_PLAYER_ID : "undefined"}</Badge>
                            </Flex>
                            <Flex align='center' direction='column'>
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <TagLabel>SECOND_PLAYER_ID</TagLabel>
                                </Tag>
                                <Badge size='lg'>{SECOND_PLAYER_ID ? SECOND_PLAYER_ID : "undefined"}</Badge>
                            </Flex>

                        </Flex>
                        <Flex gap={2}>
                            <Flex align='center' direction='column' >
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <TagLabel>CUBE 1</TagLabel>
                                </Tag>
                                <Badge size='lg'>{CUBE_1 || "undefined"}</Badge>
                            </Flex>
                            <Flex align='center' direction='column'>
                                <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                    <TagLabel>CUBE 2</TagLabel>
                                </Tag>
                                <Badge size='lg'>{CUBE_2 || "undefined"}</Badge>
                            </Flex>

                        </Flex>
                        <Flex align='center'>
                            <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                <TagLabel>CURRENT PLAYER</TagLabel>
                            </Tag>
                            <Badge size='lg'>{CURRENT_PLAYER_ID || 'undefined'}</Badge>
                        </Flex>
                        <Flex align='center'>
                            <Tag size='lg' colorScheme='orange' borderRadius='full'>
                                <TagLabel>MOVE COUNT</TagLabel>
                            </Tag>
                            <Badge size='lg'>{MOVE_COUNT || 'undefined'}</Badge>
                        </Flex>
                    </Flex>

                    <Flex gap='2' direction='column'>  {/* CONTROLS */}
                        <ButtonGroup gap='2'>
                            <Button onClick={acceptLocal} colorScheme='orange'>Accept local</Button>
                            <Button onClick={acceptRemote} colorScheme='orange'>Accept remote</Button>
                        </ButtonGroup>
                        <ButtonGroup gap='2'>
                            <Button onClick={prioritizeLocal} colorScheme='orange'>Local prior</Button>
                            <Button onClick={prioritizeRemote} colorScheme='orange'>Remote prior</Button>
                        </ButtonGroup>
                        <ButtonGroup>

                            <Button onClick={handleRoollCubes} colorScheme='orange'>roollCubes</Button>
                        </ButtonGroup>
                    </Flex>

                </Flex>

            </Flex>
        </VStack>
    );

    // function handleDragEnd(event: DragEndEvent) { }


}


function convertGameLine(
    gameLine: GameLineForUI,
    localPlayerId: string,
    firstPlayerId: string,
): CONVERTED_BOARD {

    const largerTopScheme: CONVERTING_SCHEME_BOARD = { // lager top
        left: [
            [13, 12], [14, 11], [15, 10], [16, 9], [17, 8], [18, 7],
        ],
        right: [
            [19, 6], [20, 5], [21, 4], [22, 3], [23, 2], [24, 1]
        ],
        out: [25, 0],
    }
    const smalerTopScheme: CONVERTING_SCHEME_BOARD = { // smaler top
        left: [
            [1, 24], [2, 23], [3, 22], [4, 21], [5, 20], [6, 19],
        ],
        right: [
            [7, 18], [8, 17], [9, 16], [10, 15], [11, 14], [12, 13],
        ],
        out: [0, 25],
    }

    if (localPlayerId === firstPlayerId) {
        return _convertGameLine(gameLine, largerTopScheme)
    }
    return _convertGameLine(gameLine, smalerTopScheme)
}


function _convertGameLine(gameLine: GameLineForUI, scheme: CONVERTING_SCHEME_BOARD): CONVERTED_BOARD {

    // scheme.left.map((line) => line.map((num) => gameLine[num]))
    // scheme.right.map((line) => [gameLine[line[0]], gameLine[line[1]]])

    const gameBordLiout: CONVERTED_BOARD = {
        left: scheme.left.map((line) => line.map((num) => (gameLine[num]))) as BOARD_HALF,
        right: scheme.right.map((line) => line.map((num) => gameLine[num])) as BOARD_HALF,
        out: [gameLine[scheme.out[0]], gameLine[scheme.out[1]]],
    }
    return gameBordLiout;
}

// function deepCopy<T>(instance: T): T {
//     if (instance == null) {
//         return instance;
//     }

//     // handle Dates
//     if (instance instanceof Date) {
//         return new Date(instance.getTime()) as any;
//     }

//     // handle Functions
//     if (instance instanceof Function) {
//         console.log('function', instance)
//         return instance as any;
//     }

//     // handle Array types
//     if (instance instanceof Array) {
//         var cloneArr = [] as any[];
//         (instance as any[]).forEach((value) => { cloneArr.push(value) });
//         // for nested objects
//         return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
//     }
//     // handle objects
//     if (instance instanceof Object) {
//         var copyInstance = {
//             ...(instance as { [key: string]: any }
//             )
//         } as { [key: string]: any };
//         for (var attr in instance) {
//             // console.log("attr", attr);
//             if ((instance as Object).hasOwnProperty(attr))
//                 copyInstance[attr] = deepCopy<any>((instance as any)[attr]);
//         }
//         return copyInstance as T;
//     }
//     // handling primitive data types
//     return instance;
// }


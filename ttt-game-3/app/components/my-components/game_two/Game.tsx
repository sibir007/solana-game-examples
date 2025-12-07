import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board } from "@/components/my-components/game_two/Board";
import { DraggableTrick } from './DNDComponents';
import { DroppableGemeStack } from "@/components/my-components/game_two/DNDComponents";
import { useGameState } from "@/contexts/TTTGameStateProvider_2";
// import { GameSlot, GameState, GameTrick } from "@/types/game-types";
import { Button, HStack, Input, InputGroup, InputRightElement, VStack, Wrap, WrapItem, Text, Center, Flex, Spacer } from "@chakra-ui/react";

import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { useToast } from '@chakra-ui/react'
import { Game, GameLine, GameSlot, GameState } from "@/types/game";
import { SlotNumber } from "./SlotNumber";
import { useWallet } from "@solana/wallet-adapter-react"





export function GameComponent() {
    const { game } = useGameState();
    const [gameState, setGameState] = useState(deepCopy(game));
    const [firstPlayerID, setFirstPlayerID] = useState('');
    const [secondPlayerID, setSecondPlayerID] = useState('');
    const toast = useToast();

    const LOCAL_PLAYER_ID = '1';
    const REMOTE_PLAYER_ID = '2';

    // game global state
    const GAME_STATE = gameState?.state;
    const FIRST_PLAYER_ID = gameState?.GameBoard.players.gamePlayers.first?.id;
    const SECOND_PLAYER_ID = gameState?.GameBoard.players.gamePlayers.second?.id;
    const CUBE_1 = gameState?.cube1State;
    const CUBE_2 = gameState?.cube2State;
    const CURRENT_PLAYER_ID = gameState?.currentPlayerIdToMakeMove;
    const MOVE_COUNT = gameState?.moveCount;
    const convertedBoard: CONVERTED_BOARD = convertGameLine(gameState?.GameBoard.gameBordLine!, LOCAL_PLAYER_ID, FIRST_PLAYER_ID || LOCAL_PLAYER_ID)


    function handleChangeInputFirstPlayerID(event: ChangeEvent<HTMLInputElement>): void {
        setFirstPlayerID(event.target.value);
    }
    function handleChangeInputSecondPlayerID(event: ChangeEvent<HTMLInputElement>): void {
        setSecondPlayerID(event.target.value);
    }

    function handleClickSetLocalPlayer(): void {
        try {
            game?.acceptGame(LOCAL_PLAYER_ID);
            // const newGameState = gameState;
            const newGameState = deepCopy(game);
            setGameState(newGameState!);
            toast({
                title: "Local player set",
                description: `Local player ID set to ${LOCAL_PLAYER_ID}`,
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
            game?.acceptGame(REMOTE_PLAYER_ID);
            const newGameState = deepCopy(game);
            setGameState(newGameState);
            toast({
                title: "Remote player set",
                description: `Remote player ID set to ${REMOTE_PLAYER_ID}`,
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
            game?.prioritizationByFirstPlayer(firstPlayerID);
            const newGameState = deepCopy(game);
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
            game?.prioritizationBySecondPlayer(secondPlayerID);
            const newGameState = deepCopy(game);
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
            <VStack>
                <Text>Game Component</Text>
                <Flex direction='column'> {/* STATE */}
                    <Text>GAME STATE: {GAME_STATE}</Text>
                    <Flex>
                        <Text>FIRST PLAYER ID: {FIRST_PLAYER_ID || ''}</Text>
                        <Text>SECOND PLAYER ID: {SECOND_PLAYER_ID || ''}</Text>
                    </Flex>
                    <Flex>
                        <Text>CUBE 1: {CUBE_1 || ''}</Text>
                        <Text>CUBE 2: {CUBE_2 || ''}</Text>
                    </Flex>
                    <Flex>
                        <Text>CURRENT PLAYER ID: {CURRENT_PLAYER_ID || ''}</Text>
                    </Flex>
                    <Flex>
                        <Text>MOVE COUNT: {MOVE_COUNT || ''}</Text>
                    </Flex>
                </Flex>
                <Flex h={400} align='stretch'> {/* BOARD and OUT */}
                    <Flex align='stretch'> {/* BOARD */}
                        <Flex align='stretch'> {/* BOARD LEFT SIDE */}
                            {convertedBoard.left.map((line) => (
                                <Flex direction='column'> {/*LINE*/}
                                    <SlotNumber>
                                        {line[0].slotBordPosition}
                                    </SlotNumber>
                                    < DroppableGemeStack key={line[0].slotBordPosition} id={line[0].slotBordPosition} >
                                        {
                                            line[0].gameTrickIds.map((trickId) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trickId}
                                                    id={trickId}
                                                    color={line[0].blockOnColor!}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                    <Spacer />
                                    < DroppableGemeStack key={line[1].slotBordPosition} id={line[1].slotBordPosition} >
                                        {
                                            line[1].gameTrickIds.map((trickId) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trickId}
                                                    id={trickId}
                                                    color={line[1].blockOnColor!}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                    <SlotNumber>
                                        {line[1].slotBordPosition}
                                    </SlotNumber>
                                </Flex>
                            ))}
                        </Flex>
                        <Flex align='stretch'> {/* BOARD RIGHT SIDE*/}
                            {convertedBoard.right.map((line) => (
                                <Flex direction='column'> {/*LINE*/}
                                    <SlotNumber>
                                        {line[0].slotBordPosition}
                                    </SlotNumber>
                                    < DroppableGemeStack key={line[0].slotBordPosition} id={line[0].slotBordPosition} >
                                        {
                                            line[0].gameTrickIds.map((trickId) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trickId}
                                                    id={trickId}
                                                    color={line[0].blockOnColor!}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                    <Spacer />
                                    < DroppableGemeStack key={line[1].slotBordPosition} id={line[1].slotBordPosition} >
                                        {
                                            line[1].gameTrickIds.map((trickId) => (
                                                // console.log("trick", trick),
                                                <DraggableTrick
                                                    key={trickId}
                                                    id={trickId}
                                                    color={line[1].blockOnColor!}
                                                    disabled={false}
                                                >
                                                    T
                                                </DraggableTrick>
                                            ))
                                        }
                                    </DroppableGemeStack>
                                    <SlotNumber>
                                        {line[1].slotBordPosition}
                                    </SlotNumber>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex direction='column'> {/* OUT */}
                        <SlotNumber>
                            {convertedBoard.out[0].slotBordPosition}
                        </SlotNumber>
                        < DroppableGemeStack key={convertedBoard.out[0].slotBordPosition} id={convertedBoard.out[0].slotBordPosition} >
                            {
                                convertedBoard.out[0].gameTrickIds.map((trickId) => (
                                    // console.log("trick", trick),
                                    <DraggableTrick
                                        key={trickId}
                                        id={trickId}
                                        color={convertedBoard.out[0].blockOnColor!}
                                        disabled={false}
                                    >
                                        T
                                    </DraggableTrick>
                                ))
                            }
                        </DroppableGemeStack>
                        <Spacer />
                        < DroppableGemeStack key={convertedBoard.out[1].slotBordPosition} id={convertedBoard.out[1].slotBordPosition} >
                            {
                                convertedBoard.out[1].gameTrickIds.map((trickId) => (
                                    // console.log("trick", trick),
                                    <DraggableTrick
                                        key={trickId}
                                        id={trickId}
                                        color={convertedBoard.out[1].blockOnColor!}
                                        disabled={false}
                                    >
                                        T
                                    </DraggableTrick>
                                ))
                            }
                        </DroppableGemeStack>
                        <SlotNumber>
                            {convertedBoard.out[1].slotBordPosition}
                        </SlotNumber>
                    </Flex>


                </Flex>
                <Wrap spacing={4}>
                    <WrapItem>
                        <Button onClick={handleClickSetLocalPlayer}>Set local player id {LOCAL_PLAYER_ID}</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button onClick={handleClickSetRemotePlayer}>Set remote player id {REMOTE_PLAYER_ID}</Button>
                    </WrapItem>
                    <WrapItem>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type='text'
                                value={firstPlayerID}
                                placeholder='Enter player ID'
                                onChange={handleChangeInputFirstPlayerID}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button onClick={handlePrioritizationByFirstPlayer}>
                                    prior first player
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </WrapItem>
                    <WrapItem>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type='text'
                                value={secondPlayerID}
                                placeholder='Enter player ID'
                                onChange={handleChangeInputSecondPlayerID}

                            />
                            <InputRightElement width='4.5rem'>
                                <Button onClick={handlePrioritizationBySecondPlayer}>
                                    prior second player
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </WrapItem>

                    <WrapItem>
                        <Button>roollCubes</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button>moveTrick</Button>
                    </WrapItem>
                </Wrap>
            </VStack>
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

        game?.moveTrick(active.id as number, over.id as number)

        setGameState(deepCopy(game))


    }
}

type BOARD_LINE = [GameSlot, GameSlot];
type BOARD_HALF = [BOARD_LINE, BOARD_LINE, BOARD_LINE, BOARD_LINE, BOARD_LINE, BOARD_LINE]

type CONVERTED_BOARD = {
    left: BOARD_HALF,
    right: BOARD_HALF,
    out: BOARD_LINE,
}

type SLOT_NUMBER = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24
type OUT = [25, 0] | [0, 25]

type CONVERTING_SCHEME_HALF = [
    CONVERTING_SCHEME_LINE, CONVERTING_SCHEME_LINE, CONVERTING_SCHEME_LINE, CONVERTING_SCHEME_LINE, CONVERTING_SCHEME_LINE, CONVERTING_SCHEME_LINE
]

type CONVERTING_SCHEME_LINE = [
    SLOT_NUMBER, SLOT_NUMBER
]

type CONVERTING_SCHEME_BOARD = {
    left: CONVERTING_SCHEME_HALF,
    right: CONVERTING_SCHEME_HALF,
    out: OUT,
}

function convertGameLine(
    gameLine: GameLine,
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
        out: [0, 25],
    }
    const smalerTopScheme: CONVERTING_SCHEME_BOARD = { // smaler top
        left: [
            [1, 24], [2, 23], [3, 22], [4, 21], [5, 20], [6, 19],
        ],
        right: [
            [7, 18], [8, 17], [9, 16], [10, 15], [11, 14], [12, 13],
        ],
        out: [25, 0],
    }

    if (localPlayerId === firstPlayerId) {
        return _convertGameLine(gameLine, largerTopScheme)
    }
    return _convertGameLine(gameLine, smalerTopScheme)
}


function _convertGameLine(gameLine: GameLine, scheme: CONVERTING_SCHEME_BOARD): CONVERTED_BOARD {

    scheme.left.map((line) => line.map((num) => gameLine[num]))
    scheme.right.map((line) => [gameLine[line[0]], gameLine[line[1]]])

    const gameBordLiout: CONVERTED_BOARD = {
        left: scheme.left.map((line) => line.map((num) => (gameLine[num]))) as BOARD_HALF,
        right: scheme.right.map((line) => line.map((num) => gameLine[num])) as BOARD_HALF,
        out: [gameLine[scheme.out[0]], gameLine[scheme.out[1]]],
    }
    return gameBordLiout;
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


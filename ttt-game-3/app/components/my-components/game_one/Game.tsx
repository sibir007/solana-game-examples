import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board } from "@/components/my-components/game_one/Board";
import { DraggableTrick } from "@/components/my-components/game_one/DraggableTrick";
import { DroppableGemeStack } from "@/components/my-components/game_one/DroppableGemeStack";
import { useGameState } from "@/contexts/TTTGameStateProvider";
import { GameSlot, GameState, GameTrick } from "@/types/game-types";


export function Game() {
    const { gameState, setGameState } = useGameState();

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Board>
                {gameState?.map((slot) => (
                    < DroppableGemeStack key={slot.slotId} id={slot.slotId} >
                        {
                            slot.gameTricks.map((trick) => (
                                console.log("trick", trick),
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
                ))}
            </Board>
        </DndContext >
    );

    function handleDragEnd(event: DragEndEvent) {
        console.log("drag end");
        const { active, over } = event;
        if (!over) {
            return;
        }
        console.log("drag end", active.id, over.id);


        const fromSlotId: number = gameState!.find((slot) => {
            let _t = slot.gameTricks.find((trick) => trick.id === active.id)
            console.log("_t", _t);
            return _t !== undefined;
        }
        )!.slotId;

        if (fromSlotId === over.id) {
            return;
        }

        const newGameState: GameState = getNewGameState(gameState)!;
        const fromSlot: GameSlot = newGameState.find((slot) =>
            slot.gameTricks.find((trick) => trick.id === active.id)
        )!;

        const toSlot: GameSlot = newGameState.find((slot) => slot.slotId === over.id)!;

        const indexOfMuvedTrick = fromSlot.gameTricks.findIndex((trick) => trick.id === active.id);
        console.log("indexOfMuvedTrick", indexOfMuvedTrick);
        const muvedTrick: GameTrick = fromSlot.gameTricks.splice(indexOfMuvedTrick, 1)[0];


        // const muvedTrick: GameTrick = fromSlot.gameTricks.find((trick) => trick.id === active.id)!;
        muvedTrick.currentSlotId = toSlot.slotId;

        // let filtredFromSlot = fromSlot.gameTricks.filter((trick) => {
        //     console.log ("trick.id !== active.id", trick.id, active.id);
        //     return trick.id !== active.id
        // });

        toSlot.gameTricks.push(muvedTrick);

        setGameState(newGameState);
    }

    function getNewGameState<T>(obj: T): T {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        const res: any = Array
            .isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = getNewGameState(obj[key]);
            }
        }
        return Object.assign(res, obj) as T;
    }
}


import { createContext, useContext, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    PlayerData,
    MAX_ENERGY,
    TIME_TO_REFILL_ENERGY,
    GameData,
    GAME_DATA_SEED,
    PROGRAM_ID,
    useAnchorProvider,
    getProgram,
} from "@/utils/anchor";
import { BN } from "@coral-xyz/anchor";

import { type GameState } from "@/types/game-types";
import { initialGameState } from "@/test-data/game-data";

interface TTTGameStateContextType {
    //   playerDataPDA: PublicKey | null;
    gameState: GameState | null;
    setGameState: (newGameState: GameState) => void;
    //   nextEnergyIn: number;
    //   totalWoodAvailable: number | null;
}


const TTTGameStateContext = createContext<TTTGameStateContextType>({} as TTTGameStateContextType);

export const useGameState = () => useContext(TTTGameStateContext);

export const TTTGameStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [gameState, setGameState] = useState<GameState | null>(initialGameState);

    return (
        <TTTGameStateContext.Provider
            value={{
                // playerDataPDA,
                gameState: gameState,
                setGameState: setGameState,
                // nextEnergyIn,
                // totalWoodAvailable,
            }}
        >
            {children}
        </TTTGameStateContext.Provider>
    );
};

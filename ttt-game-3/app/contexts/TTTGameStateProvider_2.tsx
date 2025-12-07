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


import {
  TrickColor,
  GameTrick,
  GameSlot,
  GameBoard,
  GameState as GameStateType,
  Player,
  TricksSet,
  GameCube,
  Game,
  PlayerVictoryStatus
} from "@/types/game";
import type {StateOfCube} from "@/types/game";
// import { Game } from '../components/my-components/Game';

interface TTTGameStateContextType_2 {
    //   playerDataPDA: PublicKey | null;
    game: Game | null;
    setGameState: (newGameState: Game) => void;
    //   nextEnergyIn: number;
    //   totalWoodAvailable: number | null;
}


const TTTGameStateContext = createContext<TTTGameStateContextType_2>({} as TTTGameStateContextType_2);

export const useGameState = () => useContext(TTTGameStateContext);

export const TTTGameStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [gameState, setGameState] = useState<Game | null>(new Game());

    return (
        <TTTGameStateContext.Provider
            value={{
                // playerDataPDA,
                game: gameState,
                setGameState: setGameState,
                // nextEnergyIn,
                // totalWoodAvailable,
            }}
        >
            {children}
        </TTTGameStateContext.Provider>
    );
};

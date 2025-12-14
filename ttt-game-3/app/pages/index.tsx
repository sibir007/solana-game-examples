import { Box, Flex, Heading, Spacer, VStack, Text, HStack } from '@chakra-ui/react';
import { useWallet } from "@solana/wallet-adapter-react"
import WalletMultiButton from "@/components/old-components/WalletMultiButton"
import DisplayGameState from "@/components/old-components/DisplayGameState"
import InitPlayerButton from "@/components/old-components/InitPlayerButton"
import SessionKeyButton from "@/components/old-components/SessionKeyButton"
import ChopTreeButton from "@/components/old-components/ChopTreeButton"
import RequestAirdrop from "@/components/old-components/RequestAirdrop"
import DisplayNfts from "@/components/old-components/DisplayNfts"
import { useState } from "react"
import { initialGameState } from "../test-data/game-data"
import { GameComponent } from '@/components/my-components/game_two/Game';
import { TTTGameStateProvider as TTTGameStateProvider_2 } from '@/contexts/TTTGameStateProvider_2'
import { Game_2 } from '@/components/my-components/game_two/Game_2';

export default function Home() {
  const { publicKey } = useWallet();
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const [gameState, setGameState] = useState(initialGameState)



  return (
    <Box bg='gray.100' id="box" h='100%' >
      <Flex px={4} py={4} bg='gray.200'>
        <Spacer bg='gray.300' />
        <WalletMultiButton />
      </Flex>
      <VStack justify='center'>
        <Heading bg='gray.300'>TttGame3</Heading>
        {!publicKey && <Text bg='gray.300'>Connect to devnet wallet!</Text>}
        <DisplayGameState />
        <InitPlayerButton />
        <SessionKeyButton />
        <ChopTreeButton />
        <RequestAirdrop />
        <DisplayNfts />


      </VStack>
      <TTTGameStateProvider_2 >

        <GameComponent />
        {/* <Game_2 /> */}
      </TTTGameStateProvider_2>
    </Box >
  )


}

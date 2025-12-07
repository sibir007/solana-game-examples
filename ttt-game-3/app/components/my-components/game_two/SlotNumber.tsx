import { Center, Text } from "@chakra-ui/react";

export function SlotNumber({children}: React.PropsWithChildren<{}>) {
    return (
        <Center>
            <Text fontSize='sm'>
                { children }
            </Text>
        </Center>
    )
}
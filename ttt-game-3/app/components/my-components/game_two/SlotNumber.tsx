import { Center, Tag, Text } from "@chakra-ui/react";

export function SlotNumber({children}: React.PropsWithChildren<{}>) {
    return (
        <Center>
            <Text fontSize='xs' textColor='white'>
                { children }
            </Text>
        </Center>
    )
}
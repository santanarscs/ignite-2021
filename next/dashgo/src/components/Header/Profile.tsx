import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Raphael Santana</Text>
        <Text color="gray.300" fontSize="small">raphaelstn@gmail.com</Text>
      </Box>
      <Avatar size="md" name="Raphael Santana" src="https://github.com/santanarscs.png"/>
    </Flex>
    
  ) 
}
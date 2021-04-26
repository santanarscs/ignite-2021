import { HStack, Icon} from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function NotificationsNav() {
  return (
    <HStack 
      mx="8" 
      pr="8" 
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
      spacing="8"
    >
      <Icon as={RiNotificationLine} fontSize="20"/>
      <Icon as={RiUserAddLine} fontSize="20"/>
    </HStack>
  )
}
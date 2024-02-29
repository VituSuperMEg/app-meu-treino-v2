import { Barbell, Bell } from "phosphor-react-native";
import { useUser } from "../store/auth";
import { Box } from "./Box";
import { Text } from "./Text";

export function Header () {

  const user = useUser(state => state.user);

  return (
    <Box padding="m" flexDirection="row" alignItems="center" justifyContent="space-between">
     <Text variant="body" color="shape">
      Bem-vindo
      {"\n"}
      <Text variant="bold" color="greenPrimary">{user.name}</Text>
     </Text>
     <Barbell size={35} color="#5ED25C"/>
    </Box>
  )
}
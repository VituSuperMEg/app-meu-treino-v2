import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { Storage } from "@services/storage";
import { useUser } from "../store/auth";
import { Header } from "@components/Header";

export function Home () {

  const logout = useUser(state => state.logout);

  return (
    <Box backgroundColor="mainBackground" flex={1} paddingTop="l">
      <Header />
      <Button
        onPress={() => logout()}
        label="Logout"
        backgroundColor="mainBackground"
        textColor="textBody"
      />
    </Box>
  )
}
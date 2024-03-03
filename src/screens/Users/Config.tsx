import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { SignOut } from "phosphor-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useUser } from "../../store/auth";
import { Header } from "@components/Header";

export function Config () {

  const logout = useUser(state => state.logout);
 
  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="l">
      <Header style="menu" name="Configurações de Usuário"/>
      <ScrollView>
      <View>
        <TouchableOpacity onPress={() => logout()}>
        <Box flexDirection="row" gap="m">
        <SignOut color="#ef4444"/>
        <Text variant="body" color="dangerPrimary">
           Sair
        </Text>
        </Box>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </Box>
  )
}
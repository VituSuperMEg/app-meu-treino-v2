import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { NotePencil } from "phosphor-react-native";

export function MyPosts() {

  const notPosts = false;
  return (
    <Box flex={1}>
    {!notPosts && (
      <Box padding="m" alignItems="center" justifyContent="center" flex={1} marginBottom="xl">
        <NotePencil color="#858585"/>
        <Text variant="body" color="textBody" padding="s">
          Você ainda não postou nada
        </Text>
        <Text variant="body" color="textBody" textAlign="center" marginTop="l">
          Que tal postar algum conteúdo e ajuda mais pessoas a malhar?
        </Text>
        <Text variant="bold" color="greenPrimary" onPress={() => navigate("Postar")} marginBottom="xl">
          Postar um conteúdo.
        </Text>
      </Box>
    )}
  </Box>
  )
}
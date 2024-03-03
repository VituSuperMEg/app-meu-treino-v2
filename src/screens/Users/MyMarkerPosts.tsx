import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { NotePencil } from "phosphor-react-native";

export function MyMarkerPosts() {
  const notPosts = false;
  return (
    <Box flex={1}>
    {!notPosts && (
      <Box padding="m" alignItems="center" justifyContent="center" flex={1} marginBottom="xl">
        <NotePencil color="#858585"/>
        <Text variant="body" color="textBody" padding="s" textAlign="center">
          Ninguém ainda lhe marcou em nenhum post..
        </Text>
      </Box>
    )}
  </Box>
  )
}
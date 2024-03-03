import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { Scroll } from "phosphor-react-native";

export function MyGrupo() {

  const grupo = false;
  return (
    <Box flex={1}>
      {!grupo && (
        <Box padding="m" alignItems="center" justifyContent="center" flex={1} marginBottom="xl">
          <Scroll color="#858585"/>
          <Text variant="body" color="textBody">
            Não temos grupos cadastrados
          </Text>
        </Box>
      )}
    </Box>
  )
}
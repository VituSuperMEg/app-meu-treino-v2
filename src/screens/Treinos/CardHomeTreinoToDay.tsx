import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { Dimensions } from "react-native";

export function CardHomeTreinoToDay () {
  const width = Dimensions.get('window').width;

  return (
    <Box p="m">
    <Box backgroundColor="greenPrimary" p="s" borderRadius={6}>
      <Text variant="body" color="zinc">
        01/01/2023
      </Text>
      <Text variant="bodyMin" color="shape">
        Segunda-Feira, Treino de Perna.
      </Text>
    </Box>
    </Box>
  )
}
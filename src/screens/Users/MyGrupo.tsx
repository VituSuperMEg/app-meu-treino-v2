import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { Scroll } from "phosphor-react-native";

export function MyGrupo() {

  const grupo = false;

  const payment = true;

  return (
    <Box flex={1}>
      {!grupo && (
        <Box padding="m" alignItems="center" justifyContent="center" flex={1} marginBottom="xl">
          <Scroll color="#858585"/>
          <Text variant="body" color="textBody">
            Não temos grupos cadastrados
          </Text>
          <Text variant="body" color="textBody" textAlign="center" marginTop="l" marginBottom="xl">
            Caso tenha vontade de participar de um grupo
            Entre em contato com Personal e utlizar a chave de acesso.
            {"\n"}
            {payment && (
            <Text variant="bold" color="greenPrimary" onPress={() => navigate("Create")}>
              Crie um grupo.
            </Text>
            )}
          </Text>
        </Box>
      )}
    </Box>
  )
}
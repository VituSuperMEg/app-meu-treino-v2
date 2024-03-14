import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { CalendarC } from "@components/Calendar";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";

export function Calendario() {
  const { goBack } = useNavigation();
  return (
    <Box flex={1} backgroundColor="mainBackground" pt="l" justifyContent="space-between">
      <Header style="menu" name="Calendário de Treino"/>
      <Box flex={1} justifyContent="space-between">
      <CalendarC />
      </Box>
    </Box>
  )
}
import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {CalendarC} from '@components/Calendar';
import {Header} from '@components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IParams} from 'src/interfaces/interfaces';

export function Calendario() {
  const {goBack} = useNavigation();
  const {params} = useRoute<IParams>();
  console.log(params?.id);
  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      pt="l"
      justifyContent="space-between">
      <Header style="menu" name="Calendário de Treino" />
      <Box flex={1} justifyContent="space-between">
        <CalendarC treinoId={params?.id} />
      </Box>
    </Box>
  );
}

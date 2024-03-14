import {Box} from '@components/Box';
import weights from '@assets/weights.png';
import {Image} from 'react-native';
import {Button} from '@components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from '@components/Text';
import { IParams } from 'src/interfaces/interfaces';

export function AddTreinoInCalendar() {
  const {goBack,navigate} = useNavigation();
  const { params } = useRoute<IParams>();

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        pt="l"
        pb="l">
        <Box></Box>
        <Box alignItems="center" p="xl">
          <Image source={weights} style={{width: 287, height: 287}} />
          <Box mt="xl">
            <Text variant="body" color="shape" textAlign="justify">
              Adicione o treino ao calendário e tenha maior controle em suas
              atividades físicas.
            </Text>
            <Text variant="bodyMin" color="textBody" textAlign="center">
              Marca o melhor dia para você está treinando...{'\n'}Vamos enviar
              uma notificação quando o treino estiver perto de acontecer.
            </Text>
          </Box>
        </Box>

        <Box>
          <Button
            label="Adicionar ao Calendário"
            backgroundColor="greenPrimary"
            height={50}
            width={350}
            alignItems="center"
            justifyContent="center"
            borderRadius={6}
            onPress={() => navigate('calendario', {
              id : params?.id
            }
            )}
          />
          <Button
            marginTop="s"
            label="Voltar"
            borderWidth={1}
            borderColor="greenPrimary"
            alignItems="center"
            justifyContent="center"
            height={50}
            width={350}
            borderRadius={6}
            onPress={() => goBack()}
          />
        </Box>
      </Box>
    </Box>
  );
}

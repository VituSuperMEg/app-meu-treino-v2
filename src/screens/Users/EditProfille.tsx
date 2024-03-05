import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';
import {Disc, FloppyDisk} from 'phosphor-react-native';

export function EditProfill() {
  const {goBack} = useNavigation();
  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      justifyContent="space-between"
      pt="l">
      <Header style="menu" name="Editar Perfil" />
      <Box p="l">
        <Box>
          <Button
            marginTop="m"
            label="Salvar"
            backgroundColor="greenPrimary"
            onPress={() => goBack()}
            borderWidth={1}
            height={50}
            alignItems="center"
            justifyContent="center"
            borderRadius={8}
            flexDirection="row"
            gap="s"
          />
          <Button
            marginTop="m"
            label="Voltar"
            textColor="greenPrimary"
            onPress={() => goBack()}
            borderWidth={1}
            borderColor="greenPrimary"
            height={50}
            alignItems="center"
            justifyContent="center"
            borderRadius={8}
          />
        </Box>
      </Box>
    </Box>
  );
}

import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';

export function EditProfill() {
  const {goBack} = useNavigation();
  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      p='l'
      justifyContent="space-between">
      <Box>
        <Text variant="body">Meu Perfil</Text>
      </Box>
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
  );
}

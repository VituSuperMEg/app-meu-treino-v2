import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {TextInputRestyle} from '@components/TextInput';
import {useNavigation} from '@react-navigation/native';
import { getData } from '@services/api';
import {Envelope} from 'phosphor-react-native';
import { useEffect } from 'react';
import { useUser } from '../store/auth';

export function SendCode() {
  const {goBack} = useNavigation();
  const name = useUser(state => state.name);

  // useEffect(() => {
  //   async function getUsers() {
  //     await getData('users');
  //   }
  //   getUsers();
  // })
  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="xl">
      <Box padding="l" justifyContent="space-between" flex={1}>
        <Text variant="bold" color="shape">
          Ops! {'\n'}Você esqueceu sua senha?{'\n'}Tenha calma vamos resolver
          isso agora. {"\n"}
        </Text>
        <Box>
          <TextInputRestyle
            label="Digite seu E-mail"
            required
            borderColor="textBody"
            borderWidth={1}
            placeholder="example@gmail.com"
            placeholderTextColor="#858585"
            paddingLeft="m"
            borderRadius={8}
            icon={<Envelope color="#858585" />}
          />
        </Box>
        <Box>
          <Button
            label="Enviar Código de Verificação"
            backgroundColor="shape"
            textColor="black"
            onPress={() => goBack()}
            borderWidth={1}
            height={55}
            alignItems="center"
            justifyContent="center"
            borderRadius={8}
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

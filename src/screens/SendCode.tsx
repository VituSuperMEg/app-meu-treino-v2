import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {TextInputRestyle} from '@components/TextInput';
import {useNavigation} from '@react-navigation/native';
import {api, submit} from '@services/api';
import {CheckCircle, Code, Envelope, XCircle} from 'phosphor-react-native';
import {useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {ActivityIndicator, Modal, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

interface ISendCode {
  email: string;
  token?: number;
}
export function SendCode() {
  const {goBack} = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      token: '',
      email: '',
    },
  });
  const [token, setToken] = useState('');
  const [screen, setScreen] = useState('digitar_email');
  const [sendToken, setSendToken] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  async function getToken() {
    const response = await api.get('auth/token');
    setToken(response.data);
  }

  const handleEnviarToken = async (data: ISendCode) => {
    setLoading(true);
    await getToken();
    const send = await submit({
      controller: 'auth/send',
      params: {
        token: token,
        email: data.email,
      },
    });
    if (send.success) {
      toast.show('Código enviando com sucesso!', {
        type: 'success',
        icon: <CheckCircle color="#fff" />,
        duration: 4000,
        successColor: '#5ED25C',
        placement: 'top',
      });
      setScreen('digitar_codigo');
      setLoading(false);
    }
  };
  const handleVerificarToken = async () => {
    if (sendToken !== token) {
      setMsg('Token Inválido');
    }
  };
  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="xl">
      {screen === 'digitar_email' && (
        <Box padding="l" justifyContent="space-between" flex={1}>
          <Text variant="bold" color="shape">
            Ops! {'\n'}Você esqueceu sua senha?{'\n'}Tenha calma vamos resolver
            isso agora. {'\n'}
          </Text>
          <Box>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputRestyle
                  label="Digite seu E-mail"
                  required
                  borderColor="textBody"
                  borderWidth={1}
                  onChangeText={onChange}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#858585"
                  paddingLeft="m"
                  borderRadius={8}
                  icon={<Envelope color="#858585" />}
                />
              )}
            />
          </Box>
          {loading && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={loading}
              onRequestClose={() => {}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            </Modal>
          )}
          <Box>
            <Button
              label="Enviar Código de Verificação"
              backgroundColor="shape"
              textColor="black"
              onPress={handleSubmit(handleEnviarToken)}
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
      )}
      {screen === 'digitar_codigo' && (
        <Box padding="l" justifyContent="space-between" flex={1}>
          <Box>
            <Text variant="bold" color="shape">
              Verifique em sua caixa de entrada, {'\n'}
              spam ou lixeira. Enviamos um código verificação.
            </Text>
            <Text variant="body" color="textBody">
              Digite o código de{' '}
              <Text variant="body" color="greenPrimary">
                6 dígitos
              </Text>{' '}
              enviado ao seu e-mail abaixo.
            </Text>
          </Box>
          <Box>
            <Controller
              control={control}
              rules={{
                max : 6,
                required : true
              }}
              name="token"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputRestyle
                  label="Código de Verificação"
                  required
                  borderColor="textBody"
                  borderWidth={1}
                  // onChangeText={setEmail}
                  placeholder="... - ..."
                  placeholderTextColor="#858585"
                  paddingLeft="m"
                  borderRadius={8}
                  icon={<Code color="#858585" />}
                  erros={
                    errors && <Text variant='body' color='danger'>
                      {!msg ? "Informe um código de verificação" : msg}
                    </Text>
                  }
                />
              )}
            />
          </Box>
          <Box>
            <Button
              label="Reenviar Código de Verificação"
              backgroundColor="shape"
              textColor="black"
              onPress={() => handleEnviarToken()}
              borderWidth={1}
              height={55}
              alignItems="center"
              justifyContent="center"
              borderRadius={8}
            />
            <Button
              label="Confirmar Verificação"
              backgroundColor="greenPrimary"
              marginTop="m"
              textColor="black"
              onPress={() => handleVerificarToken()}
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
              onPress={() => setScreen('digitar_email')}
              borderWidth={1}
              borderColor="greenPrimary"
              height={50}
              alignItems="center"
              justifyContent="center"
              borderRadius={8}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

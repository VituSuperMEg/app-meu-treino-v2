import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { ImagePickerComponent } from '@components/ImagePicker';
import { Text } from '@components/Text';
import { TextInputRestyle } from '@components/TextInput';
import { useNavigation } from '@react-navigation/native';
import { Envelope, Lock, Stack, User, UserCircle } from 'phosphor-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function EditProfill() {
  const { goBack } = useNavigation();
  const [image, setImage] = useState(null);
  const [tab, setTab] = useState('dados_basicos');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      foto: '',
    },
  });
  const width = Dimensions.get('window').width;

  return (
    <Box flex={1} backgroundColor="mainBackground" pt="l">
      <Header style="menu" name="Editar Perfil" />
      <Box p="l" flex={1} justifyContent="space-between">
        <Box width={width - 50} alignItems="center">
          <ImagePickerComponent setImage={setImage} salvar={image} profile />
          <Box
            flexDirection="row"
            justifyContent="space-between"
            width={width - 50}
            mt='s'
            >
            <TouchableOpacity
              onPress={() => setTab('dados_basicos')}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                borderBottomWidth: 3,
                borderColor:
                  tab === 'dados_basicos' ? '#5ED25C' : 'transparent',
              }}>
              <Box flexDirection='row' gap='l'>
                <Stack color={tab === 'dados_basicos' ? '#5ED25C' : '#fff'} />
                <Text variant='body' color='textBody'>Dados Básicos</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab('dados_perfil')}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                borderBottomWidth: 3,
                borderColor:
                  tab === 'dados_perfil' ? '#5ED25C' : 'transparent',
              }}>
              <Box flexDirection='row' gap='l'>
                <UserCircle color={tab === 'dados_perfil' ? '#5ED25C' : '#fff'} />
                <Text variant='body' color='textBody'>Perfil</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          {tab === 'dados_basicos' && (
            <>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputRestyle
                    marginTop="m"
                    placeholder="Nome"
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{ color: '#fff' }}
                    borderWidth={1}
                    borderRadius={6}
                    width={width - 50}
                    height={50}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={false}
                    icon={<User color="#858585" />}
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputRestyle
                    marginTop="m"
                    placeholder="E-mail"
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{ color: '#fff' }}
                    borderWidth={1}
                    borderRadius={6}
                    width={width - 50}
                    height={50}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={false}
                    icon={<Envelope color="#858585" />}
                  />
                )}
              />
              <Controller
                name="Senha"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputRestyle
                    marginTop="m"
                    placeholder="Nova Senha"
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{ color: '#fff' }}
                    borderWidth={1}
                    borderRadius={6}
                    width={width - 50}
                    height={50}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={false}
                    icon={<Lock color="#858585" />}
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputRestyle
                    marginTop="m"
                    placeholder="Nova Senha"
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{ color: '#fff' }}
                    borderWidth={1}
                    borderRadius={6}
                    width={width - 50}
                    height={50}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={false}
                    icon={<Lock color="#858585" />}
                  />
                )}
              />
            </>
          )}
        </Box>
        <Box alignItems="center">
          <Button
            marginTop="m"
            label="Salvar"
            backgroundColor="greenPrimary"
            onPress={() => goBack()}
            borderWidth={1}
            height={50}
            width={width - 50}
            alignItems="center"
            justifyContent="center"
            borderRadius={8}
            flexDirection="row"
            gap="s"
          />
          <Button
            marginTop="m"
            label="Voltar"
            width={width - 50}
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

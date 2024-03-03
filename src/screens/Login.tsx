import {Image} from 'react-native';
import {Box} from '../components/Box';
import {Text} from '../components/Text';
import {Button} from '@components/Button';
import {Controller, useForm} from 'react-hook-form';
import {TextInputRestyle} from '@components/TextInput';
import {Envelope, LockKey} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';

import cover from '../assets/cover.png';
import {submit} from '@services/api';
import {useUser} from '../store/auth';
import React, {useRef, useState} from 'react'; 

export function Login() {
  const setUser = useUser(state => state.setUser);
  const setToken = useUser(state => state.setToken);
  const [error, setError] = useState("");
  const {navigate} = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset, 
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formRef = useRef();

  const onSubmit = async data => {
    const result = await submit({
      controller: 'auth/login',
      params: {
        email: data.email,
        password: data.password,
      },
    });
    if(!result) {
      return setError("Usuário ou senha inválidos");
    }
    setUser(result.user);
    setToken(result.access_token);
    setError("");
    reset();
  };
  
  return (
    <Box flex={1} paddingTop="l" backgroundColor="mainBackground" ref={formRef}>
      <Image source={cover} style={{width: '100%', height: 300}} />
      <Box padding="s" marginTop="l">
        <Text variant="body" color="shape">
          Comece seu treino 🏅
        </Text>
        <Text variant="ligth" color="shape">
          Crie um login para começar a treinar.
        </Text>
        <Box padding="s">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputRestyle
                marginTop="m"
                placeholder="E-mail"
                placeholderTextColor="#858585"
                paddingLeft="m"
                borderColor="textBody"
                style={{color: '#fff'}}
                borderWidth={1}
                borderRadius={6}
                height={50}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={false}
                icon={<Envelope color="#858585" />}
                erros={
                  errors.email && (
                    <Text variant="body" color="danger">
                      Informe seu e-mail
                    </Text>
                  )
                }
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputRestyle
                marginTop="s"
                placeholder="Senha"
                placeholderTextColor="#858585"
                paddingLeft="m"
                height={50}
                value={value}
                borderColor="textBody"
                style={{color: '#fff'}}
                borderWidth={1}
                borderRadius={6}
                onChangeText={onChange}
                icon={<LockKey color="#858585" />}
                secret
                erros={
                  errors.password && (
                    <Text variant="body" color="danger">
                      Informe sua senha
                    </Text>
                  )
                }
              />
            )}
            name="password"
          />

          <Box alignItems="flex-end" marginTop="s">
            <Button
              onPress={() => navigate('SendCode')}
              label="Esquece a senha?"
              backgroundColor="mainBackground"
              textColor="textBody"
            />
          </Box>
          <Box justifyContent='center' alignItems='center'>
          <Text variant='body' color='danger'>
            {error}
          </Text>
          </Box>
          <Button
            onPress={handleSubmit(onSubmit)}
            backgroundColor="greenPrimary"
            label="Entrar"
            marginTop="xl"
            borderRadius={6}
            height={50}
            alignItems="center"
            justifyContent="center"
            color="shape"
          />
          <Box alignItems="center" marginTop="m">
            <Text variant="body" color="textBody">
              Não tem conta ?{' '}
              <Text variant="bold" color="greenPrimary" onPress={() => navigate("Create")}>
                Crie uma.
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

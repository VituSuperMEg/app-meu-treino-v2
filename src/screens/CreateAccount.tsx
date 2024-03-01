import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {useReducer, useState} from 'react';
import {createAccountReducer} from '../reducers/createAccount';
import {
  GenderMale,
  GenderFemale,
  User,
  Envelope,
  Lock,
  CheckCircle,
  XCircle,
} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageBackground, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ButtonFocus} from '@components/ButtonFocus';
import AgeScroll from '@components/ScroolAge';
import create from '@assets/create.png';
import {useForm, Controller} from 'react-hook-form';
import {TextInputRestyle} from '@components/TextInput';
import { submit } from '@services/api';
import { useToast } from 'react-native-toast-notifications';

export function CreateAccount() {
  const {goBack, navigate} = useNavigation();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [step, setStep] = useState('selecionar_sexo');
  const [selectedAge, setSelectedAge] = useState(18);
  const [selectedWeight, setSelectedWeight] = useState(50);
  const [selectedHeight, setSelectedHeight] = useState(100);

  const [state, dispatch] = useReducer(createAccountReducer, {
    sexo: '',
    age: '',
    weight: '',
    focus: '',
    height : '',
    level : '',
  });

  const handleSave = () => {
    dispatch({type: 'SET_AGE', value: selectedAge});
  };
  const handleSaveWeight = () => {
    dispatch({type: 'SET_WEIGHT', value: selectedWeight});
  };

  const onSubmit = async data => {
    const result = await submit({
      controller: 'users',
      params: {
        name: data.name,
        email: data.email,
        password: data.password,
        foto : '',
        premium : ''
      },
    });
    if(!result) {
      toast.show("E-mail já existe!", {
        type: 'error',
        icon : <XCircle color='#fff'/>,
        duration: 4000
      })
    }
    await submit({
      controller : "profille",
      params : {
        user_id : result?.id,
        sexo : state.sexo,
        age : state.age,
        height : state.height,
        weight : state.weight,
        focus : state.focus,
        level : state.level
      }
    });
    toast.show("Conta Criada com Sucesso", {
      type: "success",
      icon: <CheckCircle color='#fff'/>,
      duration: 4000,
    });
    navigate("Login");
  }
  return (
    <Box backgroundColor="mainBackground" flex={1} paddingTop="l">
      {step === 'selecionar_sexo' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione seu sexo
          </Text>
          <Text variant="body" color="textBody">
            Ajude-nos a montar seu melhor treino {'\n'}
            marque alguma opção abaixo e clique em continuar
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="s">
            <Box>
              <TouchableOpacity
                style={state.sexo === 'F' ? styles.select : styles.button}
                onPress={() => {
                  dispatch({type: 'SET_SEXO', value: 'F'});
                }}>
                <GenderFemale
                  color={state.sexo === 'F' ? '#5ED25C' : '#fff'}
                  size={50}
                />
                <Text
                  variant={state.sexo === 'F' ? 'bold' : 'body'}
                  color={state.sexo === 'F' ? 'greenPrimary' : 'shape'}
                  marginTop="m">
                  Feminino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={state.sexo === 'M' ? styles.select : styles.button}
                onPress={() => {
                  dispatch({type: 'SET_SEXO', value: 'M'});
                }}>
                <GenderMale
                  color={state.sexo === 'M' ? '#5ED25C' : '#fff'}
                  size={50}
                />
                <Text
                  variant={state.sexo === 'M' ? 'bold' : 'body'}
                  color={state.sexo === 'M' ? 'greenPrimary' : 'shape'}
                  marginTop="m">
                  Masculino
                </Text>
              </TouchableOpacity>
            </Box>
            <Box>
              <Button
                label="Continuar"
                backgroundColor="shape"
                textColor="black"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                onPress={() => setStep('selecionar_idade')}
                height={50}
              />
              <Button
                label="Voltar"
                backgroundColor="mainBackground"
                borderColor="greenPrimary"
                borderWidth={1}
                textColor="shape"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                marginTop="s"
                onPress={() => goBack()}
              />
            </Box>
          </Box>
        </Box>
      )}
      {step === 'selecionar_idade' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione sua idade
          </Text>
          <Text variant="body" color="textBody">
            Ajude-nos a montar seu melhor treino {'\n'}
            marque alguma opção abaixo e clique em continuar
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="s">
            <Box height={450}>
              <AgeScroll initialValue={selectedAge} onSave={setSelectedAge} />
            </Box>
            <Box>
              <Button
                label="Continuar"
                backgroundColor="shape"
                textColor="black"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                onPress={() => {
                  handleSave();
                  setStep('selecionar_peso');
                }}
              />
              <Button
                label="Voltar"
                backgroundColor="mainBackground"
                borderColor="greenPrimary"
                borderWidth={1}
                textColor="shape"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                marginTop="s"
                onPress={() => setStep('selecionar_sexo')}
              />
            </Box>
          </Box>
        </Box>
      )}
      {step === 'selecionar_peso' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione seu peso
          </Text>
          <Text variant="body" color="textBody">
            Ajude-nos a montar seu melhor treino {'\n'}
            marque alguma opção abaixo e clique em continuar.
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="s">
            <Box height={450}>
              <AgeScroll
                initialValue={selectedWeight}
                onSave={setSelectedWeight}
                metric="Kg"
              />
            </Box>
            <Box>
              <Button
                label="Continuar"
                backgroundColor="shape"
                textColor="black"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                onPress={() => {
                  handleSaveWeight();
                  setStep('selecionar_altura');
                }}
              />
              <Button
                label="Voltar"
                backgroundColor="mainBackground"
                borderColor="greenPrimary"
                borderWidth={1}
                textColor="shape"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                marginTop="s"
                onPress={() => setStep('selecionar_idade')}
              />
            </Box>
          </Box>
        </Box>
      )}
      {step === 'selecionar_altura' && (
        <Box padding="l" flex={1}>
        <Text variant="bold" color="shape">
          Selecione sua Altura
        </Text>
        <Text variant="body" color="textBody">
          Ajude-nos a montar seu melhor treino {'\n'}
          marque alguma opção abaixo e clique em continuar.
        </Text>
        <Box
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          mt="s">
          <Box height={450}>
            <AgeScroll
              initialValue={selectedHeight}
              onSave={setSelectedHeight}
              metric="CM"
            />
          </Box>
          <Box>
            <Button
              label="Continuar"
              backgroundColor="shape"
              textColor="black"
              alignItems="center"
              justifyContent="center"
              width={350}
              borderRadius={8}
              height={50}
              onPress={() => {
                dispatch({ type : "SET_HEIGHT", value : selectedHeight});
                setStep('selecionar_foco');
              }}
            />
            <Button
              label="Voltar"
              backgroundColor="mainBackground"
              borderColor="greenPrimary"
              borderWidth={1}
              textColor="shape"
              alignItems="center"
              justifyContent="center"
              width={350}
              borderRadius={8}
              height={50}
              marginTop="s"
              onPress={() => setStep('selecionar_idade')}
            />
          </Box>
        </Box>
      </Box>
      )}
      {step === 'selecionar_foco' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione seu foco
          </Text>
          <Text variant="body" color="textBody">
            Ajude-nos a montar seu melhor treino {'\n'}
            marque alguma opção abaixo e clique em continuar.
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="s">
            <Box height={450} width={350} gap="s" mt="m">
              <ButtonFocus
                text="Sou Iniciante"
                description={`Não sei nada de treino, mas meu objetivo${'\n'}não é treinar todos os dias!`}
                onSelect={() =>
                  dispatch({type: 'SET_FOCUS', value: 'Sou Iniciante'})
                }
                selected={state.focus === 'Sou Iniciante'}
              />
              <ButtonFocus
                text="Sou Entusiasta"
                description={`Tenho vontade de aprender e treinar pelo menos alguns dias da semana.`}
                onSelect={() =>
                  dispatch({type: 'SET_FOCUS', value: 'Sou Entusiasta'})
                }
                selected={state.focus === 'Sou Entusiasta'}
              />
              <ButtonFocus
                text="Sou Focado"
                description={`Já treino faz um tempo, mas meu objetivo ${'\n'}não ser muito musculoso`}
                onSelect={() =>
                  dispatch({type: 'SET_FOCUS', value: 'Sou Focado'})
                }
                selected={state.focus === 'Sou Focado'}
              />
              <ButtonFocus
                text="Sou Viciado"
                description={`Eu treino muito e meu foco ${'\n'}é ficar com shape muito massa`}
                onSelect={() =>
                  dispatch({type: 'SET_FOCUS', value: 'Sou Viciado'})
                }
                selected={state.focus === 'Sou Viciado'}
              />
            </Box>
            <Box>
              <Button
                label="Continuar"
                backgroundColor="shape"
                textColor="black"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                onPress={() => {
                  setStep('selecionar_nivel');
                }}
              />
              <Button
                label="Voltar"
                backgroundColor="mainBackground"
                borderColor="greenPrimary"
                borderWidth={1}
                textColor="shape"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                marginTop="s"
                onPress={() => setStep('selecionar_altura')}
              />
            </Box>
          </Box>
        </Box>
      )}
      {step === 'selecionar_nivel' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione seu Nivel
          </Text>
          <Text variant="body" color="textBody">
            Ajude-nos a montar seu melhor treino {'\n'}
            marque alguma opção abaixo e clique em continuar.
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="s">
            <Box height={450} width={350} gap="s" mt="m">
              <ButtonFocus
                text="Leve"
                description={`Não sei nada de treino, mas meu objetivo${'\n'}não é treinar todos os dias!`}
                onSelect={() =>
                  dispatch({type: 'SET_LEVEL', value: 'Leve'})
                }
                selected={state.level === 'Leve'}
              />
              <ButtonFocus
                text="Moderado"
                description={`Tenho vontade de aprender e treinar pelo menos alguns dias da semana.`}
                onSelect={() =>
                  dispatch({type: 'SET_LEVEL', value: 'Moderado'})
                }
                selected={state.level === 'Moderado'}
              />
              <ButtonFocus
                text="Pesado"
                description={`Já treino faz um tempo, mas meu objetivo ${'\n'}não ser muito musculoso`}
                onSelect={() =>
                  dispatch({type: 'SET_LEVEL', value: 'Pesado'})
                }
                selected={state.level === 'Pesado'}
              />
              <ButtonFocus
                text="Intenso"
                description={`Eu treino muito e meu foco ${'\n'}é ficar com shape muito massa`}
                onSelect={() =>
                  dispatch({type: 'SET_LEVEL', value: 'Intenso'})
                }
                selected={state.level === 'Intenso'}
              />
            </Box>
            <Box>
              <Button
                label="Continuar"
                backgroundColor="shape"
                textColor="black"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                onPress={() => {
                  setStep('criar_conta');
                }}
              />
              <Button
                label="Voltar"
                backgroundColor="mainBackground"
                borderColor="greenPrimary"
                borderWidth={1}
                textColor="shape"
                alignItems="center"
                justifyContent="center"
                width={350}
                borderRadius={8}
                height={50}
                marginTop="s"
                onPress={() => setStep('selecionar_idade')}
              />
            </Box>
          </Box>
        </Box>
      )}
      {step === 'criar_conta' && (
        <ImageBackground source={create} style={styles.background}>
          <Box padding='m' alignItems='center'>
          <Text variant="body" color="shape" fontSize={30}>
            Criar Conta 
          </Text>
          <Text variant="body" color="textBody" marginTop="s">
            Preencha os dados abaixo para começar a treinar
          </Text>
          </Box>
          <Box width={300}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputRestyle
                  marginTop="m"
                  placeholder="exemplo : john doe"
                  placeholderTextColor="#858585"
                  paddingLeft="m"
                  borderColor="textBody"
                  style={{color: '#fff'}}
                  borderWidth={1}
                  borderRadius={6}
                  height={50}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={false}
                  icon={<User color="#858585" />}
                  erros={
                    errors.email && (
                      <Text variant="body" color="danger">
                        Informe seu e-mail
                      </Text>
                    )
                  }
                />
              )}
              name="name"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputRestyle
                  marginTop="m"
                  placeholder="jonhdoe@gmail.com"
                  placeholderTextColor="#858585"
                  paddingLeft="m"
                  borderColor="textBody"
                  style={{color: '#fff'}}
                  borderWidth={1}
                  borderRadius={6}
                  height={50}
                  onBlur={onBlur}
                  onChangeText={onChange}
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
                  marginTop="m"
                  placeholder="senha"
                  placeholderTextColor="#858585"
                  paddingLeft="m"
                  borderColor="textBody"
                  style={{color: '#fff'}}
                  borderWidth={1}
                  borderRadius={6}
                  height={50}
                  onBlur={onBlur}
                  secret
                  onChangeText={onChange}
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
              name="password"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputRestyle
                  marginTop="m"
                  placeholder="senha"
                  placeholderTextColor="#858585"
                  paddingLeft="m"
                  borderColor="textBody"
                  style={{color: '#fff'}}
                  borderWidth={1}
                  borderRadius={6}
                  secret
                  height={50}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={false}
                  icon={<Lock color="#858585" />}
                  erros={
                    errors.email && (
                      <Text variant="body" color="danger">
                        Informe seu e-mail
                      </Text>
                    )
                  }
                />
              )}
              name="confirmPassword"
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              backgroundColor="greenPrimary"
              label="Criar Conta"
              marginTop="xl"
              borderRadius={6}
              height={50}
              alignItems="center"
              justifyContent="center"
              textColor="shape"
            />
          </Box>
        </ImageBackground>
      )}
    </Box>
  );
}

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#18181b',
    width: 200,
    height: 200,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  select: {
    backgroundColor: '#fff',
    width: 200,
    height: 200,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // ou "contain" para ajustar a imagem
    justifyContent: 'center',
    alignItems: 'center',
  },
});

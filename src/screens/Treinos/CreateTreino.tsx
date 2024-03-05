import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {Text} from '@components/Text';
import {TextInputRestyle} from '@components/TextInput';
import {useNavigation} from '@react-navigation/native';
import {Person} from 'phosphor-react-native';
import { useState } from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import { ExerciseModal } from './ExerciseModal';
import { useTreino } from './useTreino';

export function CreateTreino() {
  const {goBack} = useNavigation();
  const [show, setShow] = useState(false);
  const exercise = useTreino(s => s.exercises);
  
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      exercise: '',
      rep: '',
      progress: '',
      image: '',
      interval_exercise: '',
      volume_exercise: '',
      usersId: '',
      reader: '',
    },
  });
  return (
    <Box flex={1} backgroundColor="mainBackground" pt="l">
      <Header style="menu" name="Criar Treino" />
      <Box flex={1} justifyContent="space-between" p="l">
        <ScrollView>
          <Box>
            <Text variant="bold" color="shape" fontSize={18}>
              Cadastre seu treino
            </Text>
            <Text variant="bodyMin" color="textBody">
              Depois de cadastrar o seu treino, você pode usar a opção de
              calendário para escolher em qual dia deseja utilizar esse treino.
            </Text>
          </Box>
          <Box pt="l">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputRestyle
                  label="Nome"
                  required
                  placeholder="exemplo : treino de biceps..."
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
                  erros={
                    errors.name && (
                      <Text variant="body" color="danger">
                        Informe seu e-mail
                      </Text>
                    )
                  }
                />
              )}
              name="name"
            />
            <View style={{marginTop: 10}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputRestyle
                    label="Descrição"
                    required
                    placeholder="Adicone uma descrição..."
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    textAlignVertical='top'
                    style={{color: '#fff'}}
                    borderWidth={1}
                    borderRadius={6}
                    height={100}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={false}
                    erros={
                      errors.description && (
                        <Text variant="body" color="danger">
                          Informe seu e-mail
                        </Text>
                      )
                    }
                  />
                )}
                name="description"
              />
            </View>
            <View style={{marginTop: 10}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputRestyle
                    label="Exercícios"
                    required
                    placeholder="Voador..."
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{color: '#fff'}}
                    borderWidth={1}
                    borderRadius={6}
                    height={50}
                    onBlur={onBlur}
                    onPressIn={e => setShow(prev => !prev)}
                    onChangeText={onChange}
                    value={exercise}
                    secureTextEntry={false}
                    erros={
                      errors.exercise && (
                        <Text variant="body" color="danger">
                          Informe seu e-mail
                        </Text>
                      )
                    }
                  />
                )}
                name="exercise"
              />
             
            </View>
          </Box>
        </ScrollView>
        {show && (<ExerciseModal show={show} setShow={setShow} />)}
        <Button
          marginTop="m"
          label="Salvar"
          backgroundColor="greenPrimary"
          borderWidth={1}
          height={50}
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
  );
}

import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {Text} from '@components/Text';
import {TextInputRestyle} from '@components/TextInput';
import {useNavigation} from '@react-navigation/native';
import {Feather, Person} from 'phosphor-react-native';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {ExerciseModal} from './ExerciseModal';
import {useTreino} from './useTreino';
import {Select} from '@components/Select';
import ImagePickerComponent from './Pciker';
import {api, submit, submitMultiPart} from '@services/api';
import {separatedArray} from '@utils/utils';
import {useUser} from '@store/auth';
import {IImage} from 'src/interfaces/interfaces';

export function CreateTreino() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<any>(null);;
  const {goBack} = useNavigation();
  const exercise = useTreino(s => s.exercises);
  const user = useUser(s => s.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      // name: '',
      // description: '',
      // rep: '',
      // progress: '',
      // interval_exercise: '',
      // volume_exercise: '',
      // usersId: '',
      // reader: '',
    },
  });

  async function onSubmit(data: any) {
    // const e = separatedArray(exercise);
  const formData = new FormData();
  // formData.append('name', data.name);
  // formData.append('description', data.description);
  // // formData.append('exercise', e.join(',')); // Joining the array elements into a single string
  // formData.append('rep', data.rep);
  // formData.append('progress', 'Completo');7  
  
  image.assets.forEach((asset: { uri: string, fileName: string, type: string }) => {
    const file = {
      uri: asset.uri,
      name: asset.fileName,
      type: asset.type,
    };
    formData.append('file', file);
  });

  // formData.append('interval_exercise', data.interval_exercise || '30s'); // Default value or value from form
  // formData.append('volume_exercise', data.volume_exercise);
  // formData.append('usersId', user.id);
  // formData.append('reader', data.reader || 'NaoListado'); // Default value or value from form
  await submitMultiPart({
    controller: 'treinos',
    params: formData,
  });
  }
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
          <ImagePickerComponent setImage={setImage} />
          <Box pt="l">
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
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
                // rules={{
                //   required: true,
                // }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputRestyle
                    label="Descrição"
                    required
                    placeholder="Adicone uma descrição..."
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    textAlignVertical="top"
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
                onPressIn={e => setShow(prev => !prev)}
                value={exercise}
                secureTextEntry={false}
              />
            </View>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" marginTop="m">
            <View>
              <Controller
                control={control}
                // rules={{
                //   required: true,
                // }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputRestyle
                    label="Repetição"
                    mask="9x99"
                    width={150}
                    required
                    placeholder="3x33"
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{color: '#fff'}}
                    borderWidth={1}
                    borderRadius={6}
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
                name="rep"
              />
            </View>
            <View>
              <Controller
                control={control}
                // rules={{
                //   required: true,
                // }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputRestyle
                    label="Intervalo de Descanso"
                    required
                    placeholder="30s"
                    placeholderTextColor="#858585"
                    paddingLeft="m"
                    borderColor="textBody"
                    style={{color: '#fff'}}
                    borderWidth={1}
                    borderRadius={6}
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
                name="interval_exercise"
              />
            </View>
          </Box>
          <Box mt="m" gap="s">
            <View>
              <Controller
                control={control}
                // rules={{
                //   required: true,
                // }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Select
                    label="Selecione o Volume de Treino"
                    items={[
                      {label: 'Leve', value: 'leve'},
                      {label: 'Moderado', value: 'moderado'},
                      {label: 'Pesado', value: 'pesado'},
                      {label: 'Intenso', value: 'intenso'},
                    ]}
                    required
                    onValueChange={onChange}
                  />
                )}
                name="volume_exercise"
              />
            </View>
            <View>
              <Controller
                control={control}
                // rules={{
                //   required: true,
                // }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Select
                    label="Selecione o Status"
                    items={[
                      {label: 'Público', value: 'Publico'},
                      {label: 'Privado', value: 'Privado'},
                      {label: 'Não Listado', value: 'NaoListado'},
                    ]}
                    required
                    onValueChange={onChange}
                  />
                )}
                name="reader"
              />
            </View>
          </Box>
        </ScrollView>
        {show && <ExerciseModal show={show} setShow={setShow} />}
        <Button
          marginTop="m"
          label="Salvar"
          backgroundColor="greenPrimary"
          onPress={handleSubmit(onSubmit)}
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

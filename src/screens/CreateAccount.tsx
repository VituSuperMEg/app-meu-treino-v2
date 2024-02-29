import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {useReducer, useState} from 'react';
import {createAccountReducer} from '../reducers/createAccount';
import {GenderMale, GenderFemale} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AgeScroll from '@components/ScroolAge';

export function CreateAccount() {
  const {goBack} = useNavigation();
  const [step, setStep] = useState('selecionar_sexo');
  const [selectedAge, setSelectedAge] = useState(18);
  const [state, dispatch] = useReducer(createAccountReducer, {
    sexo: '',
    age: '',
  });

  const handleSave = () => {
    dispatch({type: 'SET_AGE', value: selectedAge});
  };

  return (
    <Box backgroundColor="mainBackground" flex={1} paddingTop="l">
      {step === 'selecionar_sexo' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione seu sexo
          </Text>
          <Text variant='body' color='textBody'>
            Ajude-nos a montar seu melhor treino {"\n"}
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
                <GenderFemale color={state.sexo === 'F' ? "#5ED25C" : "#fff"} size={50} />
                <Text variant={state.sexo === "F" ? "bold" : "body"} color={state.sexo === 'F' ? "greenPrimary" : "shape" } marginTop="m">
                  Feminino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={state.sexo === 'M' ? styles.select : styles.button}
                onPress={() => {
                  dispatch({type: 'SET_SEXO', value: 'M'});
                }}>
                <GenderMale color={state.sexo === 'M' ? "#5ED25C" : "#fff"}  size={50} />
                <Text variant={state.sexo === "M" ? "bold" : "body"} color={state.sexo === 'M' ? "greenPrimary" : "shape" } marginTop="m">
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
            Selecione sua idade {state.age}
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="xl">
            <Box height={500}>
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
                onPress={() => handleSave()}
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
});

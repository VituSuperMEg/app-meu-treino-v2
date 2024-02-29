import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {useReducer, useState} from 'react';
import {createAccountReducer} from '../reducers/createAccount';
import {GenderMale, GenderFemale} from 'phosphor-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function CreateAccount() {
  const {goBack} = useNavigation();
  const [step, setStep] = useState('selecionar_sexo');
  const [state, dispatch] = useReducer(createAccountReducer, {
    sexo: '',
  });

  return (
    <Box backgroundColor="mainBackground" flex={1} paddingTop="l">
      {step === 'selecionar_sexo' && (
        <Box padding="l" flex={1}>
          <Text variant="bold" color="shape">
            Selecione seu sexo {state.sexo}
          </Text>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            mt="xl">
            <Box>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  dispatch({type: 'SET_SEXO', value: 'F'});
                }}>
                <GenderFemale color="#5ED25C" size={50} />
                <Text variant="body" color="textBody" marginTop="m">
                  Feminino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  dispatch({type: 'SET_SEXO', value: 'M'});
                }}>
                <GenderMale color="#5ED25C" size={50} />
                <Text variant="body" color="textBody" marginTop="m">
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
});

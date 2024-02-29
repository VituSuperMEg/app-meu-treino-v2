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
import { ButtonFocus } from '@components/ButtonFocus';

export function CreateAccount() {
  const {goBack} = useNavigation();
  const [step, setStep] = useState('selecionar_sexo');
  const [selectedAge, setSelectedAge] = useState(18);
  const [selectedWeight, setSelectedWeight] = useState(50);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const [state, dispatch] = useReducer(createAccountReducer, {
    sexo: '',
    age: '',
    weight : '',
  });

  const handleSave = () => {
    dispatch({type: 'SET_AGE', value: selectedAge});
  };
  const handleSaveWeight = () => {
    dispatch({type: 'SET_WEIGHT', value: selectedWeight});
  }
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
            Selecione sua idade 
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
                onPress={() => {handleSave(); setStep("selecionar_peso")}}
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
          Selecione seu peso {state.weight}
        </Text>
        <Text variant='body' color='textBody'>
          Ajude-nos a montar seu melhor treino {"\n"}
          marque alguma opção abaixo e clique em continuar.
        </Text>
        <Box
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          mt="s">
          <Box height={450}>
            <AgeScroll initialValue={selectedWeight} onSave={setSelectedWeight} metric="Kg" />
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
         <Text variant='body' color='textBody'>
           Ajude-nos a montar seu melhor treino {"\n"}
           marque alguma opção abaixo e clique em continuar.
         </Text>
         <Box
           alignItems="center"
           justifyContent="space-between"
           flex={1}
           mt="s">
           <Box height={450} width={350} gap='s' mt='m'>
             <ButtonFocus 
               text='Sou Iniciante' 
               description={`Não sei nada de treino, mas meu objetivo${"\n"}não é treinar todos os dias!`}
               onSelect={() => handleSelect("Sou Iniciante")} // Passando a opção quando selecionado
               selected={selectedOption === "Sou Iniciante"} // Verificando se a opção está selecionada
              />
              <ButtonFocus 
               text='Sou Entusiasta' 
               description={`Tenho vontade de aprender e treinar pelo menos alguns dias da semana.`}
               onSelect={() => handleSelect("Sou Entusiasta'")} // Passando a opção quando selecionado
               selected={selectedOption === "Sou Entusiasta'"} // Verificando se a opção está selecionada
              />
              <ButtonFocus 
               text='Sou Focado' 
               description={`Já treino faz um tempo, mas meu objetivo ${"\n"}não ser muito musculoso`}
               onSelect={() => handleSelect("Sou Focado")} // Passando a opção quando selecionado
               selected={selectedOption === "Sou Focado"} // Verificando se a opção está selecionada
              />
              <ButtonFocus 
               text='Sou Viciado' 
               description={`Eu treino muito e meu foco ${"\n"}é ficar com shape muito massa`}
               onSelect={() => handleSelect("Sou Viciado")} // Passando a opção quando selecionado
               selected={selectedOption === "Sou Viciado"} // Verificando se a opção está selecionada
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
               onPress={() => handleSaveWeight()}
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

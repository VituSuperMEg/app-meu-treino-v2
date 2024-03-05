import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {TextInputRestyle} from '@components/TextInput';
import {Barbell, List, Trash, TrashSimple, X} from 'phosphor-react-native';
import {useState} from 'react';
import {Modal, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { useTreino } from './useTreino';

interface IExerciseModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ExerciseModal({show, setShow }: IExerciseModal) {
  const [exercises, setExercises] = useState<string[]>([]);
  const [newExercise, setNewExercise] = useState<string>('');
  const set = useTreino(s => s.setExercises);
  const e = useTreino(s => s.exercises);

  const handleAddExercise = () => {
    if (newExercise.trim() !== '') {
      setExercises(prev => [...prev, newExercise]);
      setNewExercise('');
    }
  };
  
  const handleRemoveExercise = (index: number) => {
    setExercises(prev => prev.filter((_, i) => i!== index));
  };

  const handleAddExerciseAndZustand = () => {
    const updatedList = [...exercises, newExercise]; 
    const updatedListString = updatedList.join(', ');
    set(updatedListString)
  }

  useState(() => {
     setExercises([e])
  }, [show]);
  
  return (
    <Box flex={1}>
      <Modal animationType="slide" visible={show}>
        <Box backgroundColor="mainBackground" flex={1}>
          <Box position="absolute" right={10} top={5}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <X color="#5ED25C" />
            </TouchableOpacity>
          </Box>
          <Box p="l" mt="l" flex={1} justifyContent="space-between">
            <Box flexDirection="row" gap="s" alignItems="center">
              <TextInputRestyle
                placeholder="Voador..."
                placeholderTextColor="#858585"
                paddingLeft="m"
                borderColor="textBody"
                style={{color: '#fff'}}
                borderWidth={1}
                borderRadius={6}
                height={50}
                onChangeText={text => setNewExercise(text)}
                value={newExercise}
                secureTextEntry={false}
                width={300}
              />
              <Button
                backgroundColor="greenPrimary"
                alignItems="center"
                justifyContent="center"
                width={50}
                height={50}
                borderRadius={10}
                onPress={handleAddExercise}
                icon={<Barbell style={{marginTop: 20}} />}
              />
            </Box>
            <Box mt="xl">
              <Text variant='bold' color='shape'>Exercícios Adicionados : </Text>
              {exercises.map((exercise, index) => (
                <ScrollView>
                <Box
                  key={index}
                  flexDirection="row"
                  justifyContent="space-between"
                  height={50}
                  backgroundColor="zinc"
                  alignItems="center"
                  pl="l"
                  borderRadius={8}
                  mb='s'
                >
                  <Text key={index} variant="body" color="textBody">
                    {index + 1} - {exercise}
                  </Text>
                  <Button
                    height={50}
                    width={50}
                    borderTopRightRadius={8}
                    borderBottomRightRadius={8}
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="dangerPrimary"
                    icon={<Trash color="#fff" style={{marginTop: 20}} />}
                  />
                </Box>
                </ScrollView>
              ))}
            </Box>
            <Box>
              <Button
                marginTop="m"
                label="Adicionar aos Exercícios"
                backgroundColor="greenPrimary"
                borderColor="greenPrimary"
                borderWidth={1}
                onPress={() => handleAddExerciseAndZustand()}
                height={50}
                alignItems="center"
                justifyContent="center"
                borderRadius={8}
              />
              <Button
                marginTop="m"
                label="Cancelar"
                backgroundColor="dangerPrimary"
                borderColor="dangerPrimary"
                borderWidth={1}
                onPress={() => setExercises([])}
                height={50}
                alignItems="center"
                justifyContent="center"
                borderRadius={8}
              />
              <Button
                marginTop="m"
                label="Voltar"
                textColor="greenPrimary"
                onPress={() => setShow(false)}
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
      </Modal>
    </Box>
  );
}

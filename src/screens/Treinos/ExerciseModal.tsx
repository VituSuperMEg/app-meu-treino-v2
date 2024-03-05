import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {Barbell, Trash, X} from 'phosphor-react-native';
import {useState} from 'react';
import {Modal, TextInput, TouchableOpacity} from 'react-native';

interface IExerciseModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ExerciseModal({show, setShow}: IExerciseModal) {
  const [exercises, setExercises] = useState<string[]>([]);
  const [newExercise, setNewExercise] = useState<string>('');

  const handleAddExercise = () => {
    if (newExercise.trim() !== '') {
      setExercises(prev => [...prev, newExercise]);
      setNewExercise('');
    }
  };

  return (
    <Box flex={1}>
      <Modal animationType="slide" visible={show}>
        <Box backgroundColor="mainBackground" flex={1}>
          <Box position="absolute" right={10} top={5}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <X color="#5ED25C" />
            </TouchableOpacity>
          </Box>
          <Box
            p="l"
            mt='l'
            flex={1}
            justifyContent="space-between">
            <Box flexDirection="row" gap="s" alignItems="center">
              <TextInput
                placeholder="Adicionar Exercício"
                placeholderTextColor="#fff"
                onChangeText={text => setNewExercise(text)}
                value={newExercise}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 6,
                  width: 300,
                  paddingLeft: 4,
                  color: '#fff',
                }}
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
              <Text variant="body" color="textBody">
                {exercises.map((exercise, index) => (
                  <Text key={index} variant="body">
                    {index + 1}-{exercise} <Trash color='#ef4444'/>
                    {index < exercises.length - 1 ? '\n' : ''}
                  </Text>
                ))}
              </Text>
            </Box>
            <Box>
            <Button
              marginTop="m"
              label="Adicionar aos Exercícios"
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

import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { DidLike } from '@components/DidLike';
import { RatingEmoji } from '@components/RatingEmoji';
import { Text } from '@components/Text';
import { TextInputRestyle } from '@components/TextInput';
import { X } from 'phosphor-react-native';
import { Modal, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface IModalFeedBack {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalFeedBack({ show, setShow }: IModalFeedBack) {
  return (
    <Box>
      <Modal animationType="slide" visible={show}>
        <Box backgroundColor="mainBackground" flex={1}>
          <Box position="absolute" right={10} top={5}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <X color="#5ED25C" />
            </TouchableOpacity>
          </Box>
          <Box p="l" mt="l" justifyContent="space-between" flex={1}>
            <Box>
              <Text variant="bold" color="shape">
                Adicione seu FeedBack
              </Text>
              <Text variant="bodyMin" color="textBody">
                É muito legal você deixar um feedback para quem cria os treinos.
                Sua avaliação é importante para o criador, então seja sincero e
                deixe aqui a sua avaliação.
              </Text>

              <Box mt="xl">
                <RatingEmoji />

                <Box>
                  <Text variant="body" color='shape'>
                    o que você gostou?
                  </Text>
                  <DidLike 
                    objectLike={[
                      { label : 'Treino bem estruturado', value : "estruturado"}
                    ]}
                  />
                </Box>
                <ScrollView >
                  <Box mt="xl" mb='s'>
                    <TextInputRestyle
                      placeholder="Deixe aqui seu feedback para o criador..."
                      placeholderTextColor="#858585"
                      paddingLeft="m"
                      borderColor="textBody"
                      style={{ color: '#fff' }}
                      borderWidth={1}
                      borderRadius={6}
                      height={200}
                      multiline
                      textAlignVertical="top"
                      // onChangeText={text => setNewExercise(text)}
                      // value={newExercise}
                      secureTextEntry={false}
                    />
                  </Box>
                </ScrollView>
              </Box>
            </Box>
            <Box>
              <Button
                label="Salvar Feedback"
                backgroundColor="greenPrimary"
                borderColor="greenPrimary"
                height={50}
                borderRadius={6}
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
              />
              <Button
                label="Voltar"
                onPress={() => setShow(false)}
                marginTop="s"
                borderColor="greenPrimary"
                height={50}
                borderRadius={6}
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

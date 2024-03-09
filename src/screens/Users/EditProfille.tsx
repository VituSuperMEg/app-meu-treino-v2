import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import { ImagePickerComponent } from '@components/ImagePicker';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions } from 'react-native';

export function EditProfill() {
  const {goBack} = useNavigation();
  const [image, setImage] = useState(null);
  const width = Dimensions.get('window').width;

  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      pt="l">
      <Header style="menu" name="Editar Perfil" />
      <Box p="l" flex={1} justifyContent='space-between' alignItems='center'>
        <Box>
         <ImagePickerComponent setImage={setImage} salvar={image}/>
        </Box>
        <Box alignItems='center'>
          <Button
            marginTop="m"
            label="Salvar"
            backgroundColor="greenPrimary"
            onPress={() => goBack()}
            borderWidth={1}
            height={50}
            width={width - 50}
            alignItems="center"
            justifyContent="center"
            borderRadius={8}
            flexDirection="row"
            gap="s"
          />
          <Button
            marginTop="m"
            label="Voltar"
            width={width - 50}
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
    </Box>
  );
}

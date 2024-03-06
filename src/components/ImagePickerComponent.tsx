import {useState} from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Button} from './Button';
import {Image, TouchableOpacity} from 'react-native';
import {Box} from './Box';
import {Camera, Trash} from 'phosphor-react-native';

export function ImagePickerComponent() {
  const [file, setFile] = useState<ImagePickerResponse>();
  const [isSelected, setIsSelected] = useState(false);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      title: 'Foto de avaliação',
      takePhotoButtonTitle: 'Escolha uma foto',
      chooseFromLibraryButtonTitle: 'Selecione da galeria uma foto',
      selectionLimit: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('Usuário cancelou a seleção');
      } else if (response.error) {
        console.log('Ocorreu um erro.');
      } else {
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const photoFile = {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
          };
          setFile(photoFile);
          setIsSelected(false);
        }
      }
    });
  };

  return (
    <>
      {file === undefined && (
        <Box alignItems="center" mt="m">
          <Button
            label="Clique aqui"
            onPress={handleChoosePhoto}
            borderColor="textBody"
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            height={200}
            width={200}
            borderRadius={500}
            icon={<Camera color="#fff" />}
          />
        </Box>
      )}
      <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
        {file && (
          <Box alignItems="center" mt="m">
            <Image source={{uri: file.uri}} style={{width: 200, height: 200}} />
          </Box>
        )}
        {isSelected && (
          <Box
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top={16}
            bottom={0}
            left={72}
            right={0}
            width={200.5}
            zIndex={2}
            backgroundColor="trasnparent">
            <TouchableOpacity onPress={() => setFile(undefined)}>
              {file !== undefined && <Trash color="#ef4444" size={40} />}
            </TouchableOpacity>
          </Box>
        )}
      </TouchableOpacity>
    </>
  );
}

import { useState } from 'react';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Button } from './Button';
import { Image, TouchableOpacity } from 'react-native';
import { Box } from './Box';
import { Trash } from 'phosphor-react-native';

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
          setIsSelected(false); // Resetar o estado quando uma nova imagem é selecionada
        }
      }
    });
  };

  return (
    <>
      <Button label="Clique aqui" onPress={handleChoosePhoto} />
      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
        style={{
          position: 'relative',
          backgroundColor: isSelected ? 'rgba(0,0,0,0.6)' : 'transparent',
        }}
      >
        {file && (
          <Image
            source={{ uri: file.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        {isSelected && (
          <Box
            alignItems='center'
            justifyContent='center'
            position='absolute'
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={2}
            backgroundColor='black'
          >
            <TouchableOpacity onPress={() => setFile(undefined)}>
              <Trash color="#ef4444" size={40} />
            </TouchableOpacity>
          </Box>
        )}
      </TouchableOpacity>
    </>
  );
}

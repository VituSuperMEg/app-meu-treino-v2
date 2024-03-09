import {useCallback, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {Box} from './Box';
import {Text} from './Text';
import {Camera, Trash} from 'phosphor-react-native';

const includeExtra = true;

export function ImagePickerComponent({
  setImage,
  salvar,
  profile = false
}: {
  setImage: any;
  salvar: any;
  profile: boolean;
}) {
  const [response, setResponse] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(false);

  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, response => {
        if (!response.didCancel) {
          setResponse(response);
          setImage(response.assets);
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, response => {
        if (!response.didCancel) {
          setResponse(response);
          setImage(response);
        }
      });
    }
  }, []);

  return (
    <>
      {!response?.assets &&
        actions.map(({title, type, options}) => {
          return (
            <TouchableOpacity
              key={title}
              onPress={() => onButtonPress(type, options)}>
              <Box
                borderWidth={1}
                borderColor="textBody"
                height={200}
                width={200}
                borderRadius={200}
                alignItems="center"
                justifyContent="center"
                gap="s">
                <Camera color="#858585" />
                <Text variant="body" color="textBody">
                  Clique aqui
                </Text>
              </Box>
            </TouchableOpacity>
          );
        })}
      {response?.assets &&
        response?.assets.map(({uri}: {uri: string}) => (
          <TouchableOpacity
            key={uri}
            onPress={() => setSelectedImage(prev => !prev)}>
            {selectedImage && (
              <Box
                position="absolute"
                zIndex={999}
                width={200}
                height={200}
                borderRadius={profile ? 200 : 0} 
                backgroundColor="transparent"
                alignItems="center"
                justifyContent="center">
                <TouchableOpacity onPress={() => setResponse(null)}>
                  <Trash color="#ef4444" size={40} />
                </TouchableOpacity>
              </Box>
            )}
            <View>
              <Image
                style={{width: 200, height: 200, objectFit: 'cover', borderRadius : profile ? 200: 0}}
                resizeMode="cover"
                resizeMethod="scale"
                source={{uri: uri}}
              />
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
}

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}

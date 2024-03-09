import * as React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {Box} from './Box';
import {Text} from './Text';
import {Camera} from 'phosphor-react-native';

const includeExtra = true;

export function ImagePickerComponent({
  setImage,
  salvar,
}: {
  setImage: any;
  salvar: any;
}) {
  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = React.useCallback((type, options) => {
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
    {!response?.assets && actions.map(({title, type, options}) => {
      return (
        <TouchableOpacity key={title} onPress={() => onButtonPress(type, options)}>
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
    {response?.assets && response?.assets.map(({ uri }: { uri: string }) => (
      <View key={uri} style={{ margin: 5 }}>
        <Image
          style={{ width: 200, height: 200, objectFit: 'cover' }}
          resizeMode="cover"
          resizeMethod="scale"
          source={{ uri: uri }}
        />
      </View>
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

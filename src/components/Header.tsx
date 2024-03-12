import { ArrowLeft, Barbell, Bell, Heart } from 'phosphor-react-native';
import { useUser } from '../store/auth';
import { Box } from './Box';
import { Text } from './Text';
import { TouchableOpacity, View } from 'react-native';
import { useNoticafion } from '../store/notification';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Notification } from './Notification';


interface IHeader {
  style : 'home' | 'menu';
  name?: string;
  favorite? : boolean;
  isModal? : boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Header({ style = 'home', name = '', favorite = false, setShow , isModal = false}:IHeader) {
  const [favorites, setFavorites] = useState("");
  const [fav, setFav] = useState(false);
  const user = useUser(state => state.user);
  const count = useNoticafion(state => state.count);
   

  const handleFavoriteTreino = (id : string) => {
    setFavorites(id)
  }
  const { navigate, goBack } = useNavigation();
  return (
    <>
      {style === 'home' && (
        <Box
          padding="m"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text variant="body" color="shape">
            Bem-vindo
            {'\n'}
            <Text variant="bold" color="greenPrimary">
              {user.name}
            </Text>
          </Text>
          <Notification />
        </Box>
      )}
      {style === 'menu' && (
        <Box padding="m" flexDirection="row" alignItems="center" gap="l" justifyContent={favorite ? 'space-between' : 'flex-start'}>
          <TouchableOpacity onPress={() => {
            isModal ? setShow(false) : goBack()
          }}>
            <ArrowLeft color="#fff" />
          </TouchableOpacity>
          <Text variant="body" color="shape">
            {name}
          </Text>
          {favorite && (
            <TouchableOpacity onPress={() => setFav(prev => !prev)}>
              <Heart color={fav ? 'red' : '#fff'} />
            </TouchableOpacity>
          )}
        </Box>
      )}
    </>
  );
}

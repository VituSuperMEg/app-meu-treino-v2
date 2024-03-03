import {Box} from '@components/Box';
import {useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';
import {Text} from '@components/Text';
import user from '@assets/user.png';
import {UserData} from '@components/UserData';

export function User() {
  const {navigate} = useNavigation();

  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="l">
      <Box padding="m">
        <UserData />
        <TouchableOpacity onPress={() => navigate('Configurações')}>
          <Text variant="bold" color="shape">
            Minha Configuração
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

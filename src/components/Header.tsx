import { ArrowLeft, Barbell, Bell } from 'phosphor-react-native';
import { useUser } from '../store/auth';
import { Box } from './Box';
import { Text } from './Text';
import { TouchableOpacity, View } from 'react-native';
import { useNoticafion } from '../store/notification';
import { useNavigation } from '@react-navigation/native';


interface IHeader {
  style : 'home' | 'menu';
  name : string;
}
export function Header({ style = 'home', name = '' }:IHeader) {
  const user = useUser(state => state.user);
  const count = useNoticafion(state => state.count);
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
          <View>
            <TouchableOpacity>
              <Barbell size={40} color="#5ED25C" />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'red',
                width: 20,
                height: 20,
                position: 'absolute',
                alignItems: 'center',
                right: -5,
                borderRadius: 10,
              }}>
              <Text variant="body" color="shape" fontSize={12}>
                {count >= 100 ? 99 : count}
              </Text>
            </View>
          </View>
        </Box>
      )}
      {style === 'menu' && (
        <Box padding="m" flexDirection="row" alignItems="center" gap="l">
          <TouchableOpacity onPress={() => goBack()}>
            <ArrowLeft color="#fff" />
          </TouchableOpacity>
          <Text variant="body" color="shape">
            {name}
          </Text>
        </Box>
      )}
    </>
  );
}

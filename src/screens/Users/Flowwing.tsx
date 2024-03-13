import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {Text} from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import {api} from '@services/api';
import {useUser} from '@store/auth';
import {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {IFlowwing} from 'src/interfaces/interfaces';

export function Flowwing() {
  const user = useUser(u => u.user);
  const [floowing, setFloowwing] = useState<IFlowwing[] | []>([]);
  const { navigate } = useNavigation();

  async function getFloowwing() {
    try {
      const response = await api.get(`users/flowwing/${user.id}`);
      setFloowwing(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFloowwing();
  }, [user]);

  return (
    <Box backgroundColor="mainBackground" flex={1} pt="l">
      <Header style="menu" name="Seguindo" />
      <Box m="m">
        {floowing.map(f => (
          <Box
            key={f.name}
            flexDirection="row"
            alignItems="center"
            gap="l"
            justifyContent="space-between">
            <Box flexDirection="row" alignItems="center" gap="m">
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
                onPress={() => navigate('follower', {
                  id : f.id
                })}
              >
                <Image
                  source={{uri: f.foto}}
                  width={50}
                  height={50}
                  style={{borderRadius: 50}}
                />
                <Text variant="body" color="shape">
                  {f.name}
                </Text>
              </TouchableOpacity>
            </Box>
            <Button
              label="Deixar de seguir"
              backgroundColor="shape"
              padding="s"
              textColor="black"
              borderRadius={6}
              height={40}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

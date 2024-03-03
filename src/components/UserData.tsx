import {Box} from '@components/Box';
import {useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';
import {Text} from '@components/Text';
import userImg from '@assets/user.png';
import {useUser} from '../store/auth';
import {useEffect, useState} from 'react';
import {api} from '@services/api';
import {Waveform} from 'phosphor-react-native';

interface Profile {
  user_id: string;
  age: string;
  sexo: string;
  height: string;
  weight: string;
  focus: string;
  level: string;
}

export function UserData() {
  const user = useUser(state => state.user);
  const [profile, setProfilleState] = useState<Profile>({} as Profile);

  useEffect(() => {
    async function getProfile() {
      const profile = await api.get(`profille/${user.id}`);
      setProfilleState(profile.data);
    }
    getProfile();
  }, []);
  return (
    <Box flexDirection="row" gap="m">
      <Image
        source={userImg}
        style={{width: 50, height: 50, borderRadius: 50}}
      />
      <Box>
        <Box>
          <Text variant="bold" color="shape">
            {user.name}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" justifyContent="center" gap='s'>
          <Waveform color="#858585" />
          <Text variant="body" color="textBody">
            {profile.focus}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

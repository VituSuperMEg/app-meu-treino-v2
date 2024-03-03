import {Box} from '@components/Box';
import {useNavigation} from '@react-navigation/native';
import {Alert, Image, Modal, TouchableOpacity} from 'react-native';
import {Text} from '@components/Text';
import userImg from '@assets/user.png';
import {useUser} from '../store/auth';
import {useEffect, useState} from 'react';
import {api} from '@services/api';
import {Hamburger, List, SmileyWink, Waveform} from 'phosphor-react-native';

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
  const setProfille = useUser(state => state.setProfille);
  const [profile, setProfilleState] = useState<Profile>({} as Profile);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const profile = await api.get(`profille/${user.id}`);
      setProfilleState(profile.data);
      setProfille(profile.data);
    }
    getProfile();
  }, []);

  return (
    <Box flexDirection="row" gap="m" justifyContent='space-between' alignItems='center'>
      <Box flexDirection="row" gap='s'>
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
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="s">
            <Text variant="body" color="textBody">
              {profile.focus}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <TouchableOpacity onPress={() => setShow(true)}>
         <List color='#fff' size={30}/>
        </TouchableOpacity>
      </Box>
      {show && (
        <Modal onRequestClose={() => {
          setShow(!show);
        }}>
          <TouchableOpacity>
          <Text variant='bold'>X</Text>

          </TouchableOpacity>
        </Modal>
      )}
    </Box>
  );
}

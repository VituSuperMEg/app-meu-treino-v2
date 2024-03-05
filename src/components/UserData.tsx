import {Box} from '@components/Box';
import {useNavigation} from '@react-navigation/native';
import {Alert, Image, Modal, TouchableOpacity, View} from 'react-native';
import {Text} from '@components/Text';
import userImg from '@assets/user.png';
import {useUser} from '../store/auth';
import {useEffect, useState} from 'react';
import {api} from '@services/api';
import {
  Barbell,
  ChartDonut,
  ForkKnife,
  Gear,
  Hamburger,
  List,
  NotePencil,
  PersonSimpleBike,
  SmileyWink,
  Users,
  Waveform,
} from 'phosphor-react-native';

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

  const {navigate} = useNavigation();
  useEffect(() => {
    async function getProfile() {
      const profile = await api.get(`profille/${user.id}`);
      setProfilleState(profile.data);
      setProfille(profile.data);
    }
    getProfile();
  }, []);

  return (
    <>
      <Box
        flexDirection="row"
        gap="m"
        justifyContent="space-between"
        alignItems="center">
        <Box flexDirection="row" gap="s">
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
            <List color="#fff" size={30} />
          </TouchableOpacity>
        </Box>
      </Box>
      {show && (
        <Modal
          animationType="slide"
          transparent={true}
          // visible={loading}
          onRequestClose={() => {}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <Box
              backgroundColor="zinc"
              position="absolute"
              bottom={0}
              height={500}
              width={400}>
              <Box flexDirection='row' alignItems='center' justifyContent='center'>
                <Text variant="bodyMin" color='textBody'>Versão 0.0.7</Text>
                <TouchableOpacity
                  onPress={() => setShow(false)}
                  style={{position: 'absolute', right: 20, top: 10}}>
                  <Text variant="bold" color="shape">
                    X
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box mt="xl" position="relative" top={30}>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <Gear color="#858585" />
                    <Text variant="bold" color="shape">
                      Minha Configuração
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <NotePencil color="#858585" />
                    <Text variant="bold" color="shape">
                      Novos Posts
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <Barbell color="#858585" />
                    <Text variant="bold" color="shape">
                      Meus Treinos
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <Users color="#858585" />
                    <Text variant="bold" color="shape">
                      Meus Grupos
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <ChartDonut color="#858585" />
                    <Text variant="bold" color="shape">
                      Metricas
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <PersonSimpleBike color="#858585" />
                    <Text variant="bold" color="shape">
                      Cardio
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('Configurações');
                    setShow(false);
                  }}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    borderBottomWidth={1}
                    padding="m"
                    borderColor="textBody">
                    <ForkKnife color="#858585" />
                    <Text variant="bold" color="shape">
                      Dieta
                    </Text>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </View>
        </Modal>
      )}
    </>
  );
}

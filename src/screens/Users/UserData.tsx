import {Box} from '@components/Box';
import {useNavigation} from '@react-navigation/native';
import {Alert, Image, Modal, TouchableOpacity, View} from 'react-native';
import {Text} from '@components/Text';
import {useUser} from '@store/auth';
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
  User,
  Users,
  Waveform,
} from 'phosphor-react-native';
import {IProfile, IUserState} from 'src/interfaces/interfaces';

interface UserDataParams {
  user_id: string;
  flower?: boolean;
}
export function UserData({user_id, flower = false}: UserDataParams) {
  const [profile, setProfilleState] = useState<IProfile>({} as IProfile);
  const [user, setUser] = useState({} as IUserState);
  const [show, setShow] = useState(false);

  const {navigate} = useNavigation();

  useEffect(() => {
    async function getData() {
      const user = await api.get(`users/${user_id}`);
      const profile = await api.get(`profille/${user_id}`);
      setProfilleState(profile.data);
      setUser(user.data);
    }
    getData();
  }, [user_id]);

  return (
    <>
      <Box
        flexDirection="row"
        gap="m"
        justifyContent="space-between"
        alignItems="center">
        <Box flexDirection="row" gap="s">
          {user.foto ? (
            <Image
              source={{uri: user?.foto}}
              style={{width: 50, height: 50, borderRadius: 50}}
            />
          ) : (
            <Box
              backgroundColor="zinc"
              width={50}
              height={50}
              borderRadius={50}
              alignItems="center"
              justifyContent="center">
              <User color="#fff" />
            </Box>
          )}

          <Box flexDirection='row' gap='l'>
            <Box>
              <Text variant="bold" color="shape">
                {user.name}
              </Text>
              <Text variant="body" color="textBody">
                {profile.focus}
              </Text>
            </Box>
            {/* <Box flexDirection='row' gap="m">
              <Text variant="body" color="textBody" textAlign='center'>
                Seguidores
                {"\n"}
                <Text variant='body' color='greenPrimary'>0</Text>
              </Text>
              <Text variant="body" color="textBody" textAlign='center'>
                Seguindo
                {"\n"}
                <Text variant='body' color='greenPrimary'>0</Text>
              </Text>
            </Box> */}
          </Box>
        </Box>
        <Box>
          {!flower && (
            <TouchableOpacity onPress={() => setShow(true)}>
              <List color="#fff" size={30} />
            </TouchableOpacity>
          )}
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
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center">
                <Text variant="bodyMin" color="textBody">
                  Versão 0.0.7
                </Text>
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

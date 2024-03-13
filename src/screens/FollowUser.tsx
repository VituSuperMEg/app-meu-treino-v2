import {Box} from '@components/Box';
import {Header} from '@components/Header';
import {useRoute} from '@react-navigation/native';
import {api, submit} from '@services/api';
import {useEffect, useState} from 'react';
import {IParams, IProfile, IUserState} from 'src/interfaces/interfaces';
import {UserData} from './Users/UserData';
import {Button} from '@components/Button';
import {Alert, Dimensions, Modal, TouchableOpacity, View} from 'react-native';
import {
  Barbell,
  CheckCircle,
  Factory,
  Lock,
  Stack,
  Users,
} from 'phosphor-react-native';
import {Text} from '@components/Text';
import {useToast} from 'react-native-toast-notifications';
import {useUser} from '@store/auth';
import {MyPosts} from './Users/MyPosts';
import {MyMarkerPosts} from './Users/MyMarkerPosts';
import {MyTreinos} from './Users/MyTreinos';
import {MyGrupo} from './Users/MyGrupo';

export function FollowUser() {
  const [user, setUser] = useState({} as IUserState);
  const [profile, setProfile] = useState({} as IProfile);
  const [seguir, setSeguir] = useState(false);
  const [wait, setWait] = useState('pedir');
  const [tab, setTab] = useState('meus_posts');
  const [stopConfirmationModal, setStopConfirmationModal] = useState(false);
  const [idRequest, setIdRequest] = useState(0);
  const myUser = useUser(u => u.user);

  const {params} = useRoute<IParams>();

  const toast = useToast();
  const width = Dimensions.get('window').width;

  useEffect(() => {
    if (params) {
      async function getData() {
        const respose = await api.get(`/users/${params?.id}`);
        const proes = await api.get(`/profille/${params?.id}`);
        setProfile(proes.data);
        setUser(respose.data);
      }
      getData();
    }
  }, [params]);

  async function getFriendRequest() {
    try {
      const res = await api.get('users/add-friend', {
        params: {
          senderId: myUser.id,
          receiverId: params?.id,
        },
      });
      setIdRequest(res.data.id);
      if (res.data.status === 'enviado') {
        setWait('enviado');
      } else if (res.data.status === 'aceito') {
        setWait('aceito');
      } else {
        setWait('pedir');
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getFriendRequest();
  }, [params, wait]);

  async function handlePedirParaSeguir(id: string) {
    if (wait === 'pedir') {
      const res = await submit({
        controller: 'users/add-friend',
        params: {
          senderId: myUser.id,
          receiverId: id,
        },
      });
      toast.show('Solicitação enviada com sucesso', {
        icon: <CheckCircle color="#fff" />,
        type: 'success',
        duration: 4000,
        successColor: '#5ED25C',
        placement: 'top',
      });
      setWait('enviado');
    }
  }

  async function handleCancelarSolicaticao(id: string) {
    try {
      const res = await submit({
        controller: 'users/delete-friend',
        params: {
          id: idRequest,
          senderId: myUser.id,
          receiverId: id,
        },
      });

      if (res) {
        setStopConfirmationModal(false);
        await getFriendRequest();
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Box backgroundColor="mainBackground" flex={1} pt="l">
      <Header style="menu" name={user.name} />
      <Box padding="l">
        <UserData user_id={user?.id} flower />
        <Box mt="l" flexDirection="row" justifyContent="space-between" gap="s">
          {profile.private !== 'public' ? (
            <Button
              label={
                wait === 'pedir'
                  ? 'Pedir para Seguir'
                  : wait === 'enviado'
                  ? 'Aguardando confirmação'
                  : 'Seguindo'
              }
              onPress={() => {
                wait === 'pedir'
                  ? handlePedirParaSeguir(user.id)
                  : setStopConfirmationModal(true);
              }}
              backgroundColor={
                wait === 'pedir'
                  ? 'zinc'
                  : wait === 'enviado'
                  ? 'mainBackground'
                  : 'greenPrimary'
              }
              borderWidth={wait === 'enviado' ? 1 : 0}
              borderColor="textBody"
              height={40}
              width={wait === 'aceito' ? width - 220 : width - 50}
              alignItems="center"
              justifyContent="center"
              borderRadius={6}
              flexDirection="row"
              gap="s"
              icon={wait === 'pedir' ? <Lock color="#fff" /> : ''}
            />
          ) : (
            <Button
              label={seguir ? 'Seguindo' : 'Seguir'}
              onPress={() => setSeguir(prev => !prev)}
              backgroundColor={seguir ? 'shape' : 'greenPrimary'}
              height={40}
              alignItems="center"
              justifyContent="center"
              borderRadius={6}
              textColor={seguir ? 'black' : 'shape'}
            />
          )}
          {wait === 'aceito' && (
            <Button
              label="Deixar de Seguir"
              backgroundColor="shape"
              height={40}
              onPress={() => setStopConfirmationModal(true)}
              width={width - 220}
              alignItems="center"
              justifyContent="center"
              textColor="black"
              borderRadius={6}
            />
          )}
        </Box>
      </Box>
      {profile.private !== 'public' && wait !== 'aceito' && (
        <Box width={width} backgroundColor="textBody" height={1} />
      )}
      {profile.private !== 'public' && wait !== 'aceito' ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text variant="bold" color="shape" textAlign="center">
            Essa conta é privada {'\n'}
            Não é possível ver suas publicações
          </Text>
          <Text variant="bodyMin" color="textBody" textAlign="center">
            Siga para ver todas as publicações
          </Text>
        </Box>
      ) : (
        <Box flex={1} pr='m' pl='m'>
          <Box flexDirection="row" justifyContent="space-between">
            <TouchableOpacity
              onPress={() => setTab('meus_posts')}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                borderBottomWidth: 3,
                borderColor: tab === 'meus_posts' ? '#5ED25C' : 'transparent',
              }}>
              <Stack color={tab === 'meus_posts' ? '#5ED25C' : '#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab('meus_treinos')}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                borderBottomWidth: 3,
                borderColor: tab === 'meus_treinos' ? '#5ED25C' : 'transparent',
              }}>
              <Barbell color={tab === 'meus_treinos' ? '#5ED25C' : '#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab('meus_marcados')}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                borderBottomWidth: 3,
                borderColor:
                  tab === 'meus_marcados' ? '#5ED25C' : 'transparent',
              }}>
              <Users color={tab === 'meus_marcados' ? '#5ED25C' : '#fff'} />
            </TouchableOpacity>
          </Box>
          <View
            style={{
              width: 500,
              backgroundColor: '#858585',
              height: 1,
              position: 'relative',
              left: -20,
            }}
          />
          {tab === 'meus_posts' && <MyPosts />}
          {tab === 'meus_marcados' && <MyMarkerPosts />}
          {tab === 'meus_treinos' && <MyTreinos id={params.id}/>}
          {tab === 'meus_grupos' && <MyGrupo />}
        </Box>
      )}
      <Modal visible={stopConfirmationModal} animationType="slide" transparent>
        <Box
          flex={1}
          backgroundColor="transparent"
          alignItems="center"
          justifyContent="center">
          <Box backgroundColor="zinc" borderRadius={10}>
            <Box p="l">
              <Text variant="bold" color="shape" textAlign="center">
                Deseja Cancelar sua Solicitação para seguir
                <Text variant="bold" color="greenPrimary">
                  {' '}
                  @{user.name}
                </Text>{' '}
                ?
              </Text>
            </Box>
            <Box backgroundColor="textBody" height={1} />
            <Box flexDirection="row" p="s" justifyContent="space-between">
              <Button
                label="Confirmar"
                width={width - 250}
                onPress={() => {
                  handleCancelarSolicaticao(profile.user_id);
                }}
                backgroundColor="greenPrimary"
                height={40}
                alignItems="center"
                justifyContent="center"
                textColor="shape"
                borderRadius={6}
              />
              <Button
                label="Cancelar"
                width={width - 250}
                onPress={() => setStopConfirmationModal(false)}
                backgroundColor="dangerPrimary"
                textColor="shape"
                height={40}
                alignItems="center"
                justifyContent="center"
                borderRadius={6}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

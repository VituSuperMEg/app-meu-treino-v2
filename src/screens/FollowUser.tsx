import {Box} from '@components/Box';
import {Header} from '@components/Header';
import {useRoute} from '@react-navigation/native';
import {api, getData} from '@services/api';
import {useEffect, useState} from 'react';
import {IProfile, IUserState} from 'src/interfaces/interfaces';
import {UserData} from './Users/UserData';
import {Button} from '@components/Button';
import { Dimensions } from 'react-native';
import { Lock } from 'phosphor-react-native';
import { Text } from '@components/Text';

export function FollowUser() {
  const [user, setUser] = useState({} as IUserState);
  const [profile, setProfile] = useState({} as IProfile);
  const [seguir, setSeguir] = useState(false);
  const {params} = useRoute();
  const isNotFloweer = false;
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
  return (
    <Box backgroundColor="mainBackground" flex={1} pt="l">
      <Header style="menu" name={user.name} />
      <Box padding="l">
        <UserData user_id={user?.id} flower />
        <Box mt="l">
          {profile.private !== 'public' ? (
            <Button
              label="Pedir para Seguir"
              backgroundColor="zinc"
              height={40}
              alignItems="center"
              justifyContent="center"
              borderRadius={6}
              flexDirection='row'
              gap='s'
              icon={<Lock color='#fff'/>}
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
          {isNotFloweer && (
            <Button
              label="Deixar de Seguir"
              backgroundColor="shape"
              height={40}
              alignItems="center"
              justifyContent="center"
              textColor="black"
              borderRadius={6}
            />
          )}
        </Box>
      </Box>
      <Box width={width} backgroundColor='textBody' height={1}/>
      {profile.private !== 'public' ? (
        <Box flex={1} alignItems='center' justifyContent='center'>
          <Text variant='bold' color='shape' textAlign='center'>
            Essa conta é privada {"\n"}
            Não é possível ver suas publicações
          </Text>
          <Text variant='bodyMin' color='textBody' textAlign='center'>
            Siga para ver todas as publicações
          </Text>
        </Box>
      ) : (
        <Box>
        </Box>
      )}
    </Box>
  );
}

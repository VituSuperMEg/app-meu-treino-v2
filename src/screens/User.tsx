import { Box } from '@components/Box';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { UserData } from './Users/UserData';
import { Profille } from './Users/Profille';
import { useEffect, useState } from 'react';
import { Barbell, Factory, Stack, Users } from 'phosphor-react-native';
import { MyPosts } from './Users/MyPosts';
import { MyMarkerPosts } from './Users/MyMarkerPosts';
import { MyTreinos } from './Users/MyTreinos';
import { MyGrupo } from './Users/MyGrupo';
import { useUser } from '@store/auth';

export function User() {

  const [userId, setUserId] = useState('');
  const [tab, setTab] = useState('meus_posts');
  const user = useUser(s => s.user);
  const { navigate } = useNavigation();
  const { params } = useRoute();


  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="l">
      <Box padding="m">
        <UserData user_id={user.id}/>
        <Profille />
        <Box flexDirection="row" mt="m" justifyContent="space-between" >
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
            onPress={() => setTab('meus_grupos')}
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              borderBottomWidth: 3,
              borderColor: tab === 'meus_grupos' ? '#5ED25C' : 'transparent',
            }}>
            <Factory color={tab === 'meus_grupos' ? '#5ED25C' : '#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('meus_marcados')}
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              borderBottomWidth: 3,
              borderColor: tab === 'meus_marcados' ? '#5ED25C' : 'transparent',
            }}>
            <Users color={tab === 'meus_marcados' ? '#5ED25C' : '#fff'} />
          </TouchableOpacity>
        </Box>
        <View
          style={{
            width: 400,
            backgroundColor: '#858585',
            height: 1,
            position: 'relative',
            left: -20,
          }}
        />
      </Box>
      {tab === 'meus_posts' && <MyPosts />}
      {tab === 'meus_marcados' && <MyMarkerPosts />}
      {tab === 'meus_treinos' && <MyTreinos />}
      {tab === 'meus_grupos' && <MyGrupo />}
    </Box>
  );
}

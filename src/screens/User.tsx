import { Box } from '@components/Box';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { UserData } from '@components/UserData';
import { Profille } from '@components/Profille';
import { useState } from 'react';
import { Barbell, Factory, Stack, Users } from 'phosphor-react-native';
import { MyPosts } from './Users/MyPosts';
import { MyMarkerPosts } from './Users/MyMarkerPosts';
import { MyTreinos } from './Users/MyTreinos';
import { MyGrupo } from './Users/MyGrupo';

export function User() {
  const { navigate } = useNavigation();
  const [tab, setTab] = useState('meus_posts');
  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="l">
      <Box padding="m">
        <UserData />
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

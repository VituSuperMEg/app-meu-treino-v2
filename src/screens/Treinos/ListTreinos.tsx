import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Box} from '@components/Box';
import {Text} from '@components/Text';
import {api} from '@services/api';
import {ButtonLinear} from '@components/ButtonLienar';
import {DEFAULT_ICON} from '@utils/utils';
import {Button} from '@components/Button';
import {useNavigation} from '@react-navigation/native';

export function ListTreinos() {
  const [treinos, setTreinos] = useState([]);
  const {navigate} = useNavigation();

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos`);
        if (response.data) {
          setTreinos(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);

  const renderItem = ({item}) => (
    <Box
      key={item.id}
      backgroundColor="zinc"
      alignItems="center"
      justifyContent="center"
      padding="m"
      marginVertical="s"
      borderRadius={8}
      flexDirection="row"
      p="l"
      height={123}
      justifyContent="space-between">
      <Box>
        <Text variant="body" color="textBody">
          {item.name}
        </Text>
        {/* <Text variant="body" color="textBody">
          {item.description}
        </Text> */}
        <Text variant="body" color="textBody">
          Criador:{' '}
          <Text variant="bold" color="greenPrimary">
            @
          </Text>
          {item.author.name}
        </Text>
      </Box>
      <Box alignItems="flex-end" gap="l">
        <Text variant="body" color="textBody">
          {DEFAULT_ICON[item.volume_exercise]}
        </Text>
        <Button
          label="Ver Treino"
          backgroundColor="greenPrimary"
          padding="s"
          borderRadius={6}
          onPress={() => navigate("FindTreino", {
            id : item.id
          })}
        />
      </Box>
    </Box>
  );

  return (
    <FlatList
      data={treinos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: 20, paddingBottom: 70}}
    />
  );
}

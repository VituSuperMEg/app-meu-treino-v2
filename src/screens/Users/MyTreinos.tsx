import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { api } from '@services/api';
import { useUser } from '@store/auth';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export function MyTreinos() {
  const [treinos, setTreinos] = useState([]);
  const user = useUser(s => s.user);

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos/${user.id}`);
        setTreinos(response.data);
      } catch (error) {
        console.error('Erro ao buscar treinos:', error);
      }
    }
    get();
  }, []);

  const renderItem = ({ item }) => (
    <Box
      key={item.id}
      backgroundColor="zinc"
      padding="l"
      borderRadius={6}
      mb="s"
    >
      <Text variant="body" color="greenPrimary">
        {item.name}
      </Text>
      <Text variant="bodyMin" color="textBody">
        {item.description}
      </Text>
      {item.exercise.map((e, index) => (
        <Text key={index} variant="bodyMin" color="textBody">
          {e}
        </Text>
      ))}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text variant="body" color="greenPrimary">
            {item.interval_exercise}
          </Text>
        </Box>
        <Box>
          <Button
            onPress={() => navigate('Treino', { id: item.id })}
            backgroundColor="greenPrimary"
            label="Visualizar"
            marginTop="xl"
            borderRadius={6}
            height={50}
            width={100}
            alignItems="center"
            justifyContent="center"
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={treinos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={{ marginTop: 20, height : 300, marginBottom: 400}}
    />
  );
}

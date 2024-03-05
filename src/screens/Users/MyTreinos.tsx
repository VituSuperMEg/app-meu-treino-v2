import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { api } from '@services/api';
import { useUser } from '@store/auth';
import { DEFAULT_ICON } from '@utils/utils';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ITreinos } from 'src/interfaces/interfaces';

export function MyTreinos() {

  const [treinos, setTreinos] = useState<ITreinos | []>([]);
  const user = useUser(s => s.user);

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos/user/${user.id}`);
        setTreinos(response.data);
      } catch (error) {
        console.error('Erro ao buscar treinos:', error);
      }
    }
    get();
  }, []);

  const renderItem = ({ item }: { item: ITreinos }) => (
    <Box
      key={item.id}
      backgroundColor="zinc"
      padding="l"
      borderRadius={6}
      mb="s">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text variant="body" color="greenPrimary">
          {item.name}
        </Text>
        <Text variant="body" color="greenPrimary">
          {DEFAULT_ICON[item.volume_exercise]}
        </Text>
      </Box>
      <Text variant="bodyMin" color="textBody" mt="l">
        {item.description}
      </Text>
      <Text variant="body" color="shape" mt='l'>
        Meus Exercícios :
      </Text>
      {item.exercise.map((e, index) => (
        <Text key={index} variant="bodyMin" color="textBody" mt='s'>
          {index + 1} - {e}
        </Text>
      ))}
      <Button
        onPress={() => navigate('Treino', { id: item.id })}
        backgroundColor="greenPrimary"
        label="Visualizar"
        marginTop="xl"
        borderRadius={6}
        height={50}
        alignItems="center"
        justifyContent="center"
      />
    </Box>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={treinos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingVertical: 20, paddingBottom : 70 }}
      style={{ flex: 1, margin: 20 }}
    />
  );
}

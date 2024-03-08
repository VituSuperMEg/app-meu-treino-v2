import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';
import { Box } from '@components/Box';
import { Text } from '@components/Text';
import { api } from '@services/api';
import { DEFAULT_ICON } from '@utils/utils';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { ITreinos } from 'src/interfaces/interfaces';
import empty from "@assets/Empty-cuate.png";
import { Selection } from 'phosphor-react-native';

interface IList {
  search: string;
  intensidade: string;
  group : string;
}


const EmptyList = () => {
  return (
    <Box alignItems='center' mt='l'>
      <Selection color='#858585'/>
      <Text variant='body' color='textBody'>
        Sem Resultados
      </Text>
    </Box>
  );
}
export function ListTreinos({
  search,
  intensidade,
  group
}: IList) {
  const [treinos, setTreinos] = useState<ITreinos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function fetchTreinos() {
      try {
        setLoading(true);
        console.log(intensidade)

        const response = await api.get('treinos', {
          params: {
            search: search || undefined,
            intensidade: intensidade || undefined,
            group: group || undefined,
          },
        });
        setTreinos(response.data || []);
      } catch (error) {
        console.log('Erro ao buscar treinos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTreinos();
  }, [search, intensidade]);

  const renderTreinoItem = ({ item }: { item: ITreinos }) => (
    <Box
      key={item.id}
      backgroundColor="zinc"
      alignItems="center"
      padding="m"
      marginVertical="s"
      borderRadius={8}
      flexDirection="row"
      p="l"
      height={123}
      justifyContent="space-between"
    >
      <Image
        source={item.image ? { uri: item.image } : empty}
        style={{
          height: 80,
          width: 80,
          objectFit: 'contain',
        }}
      />
      <Box mr='l' ml='s'>
        <Text variant="bodyMin" color="textBody">
          {item.name}
        </Text>
        <Text variant="bodyMin" color="textBody">
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
            id: item.id,
          })}
        />
      </Box>
    </Box>
  );

  if (loading) {
    <ActivityIndicator style={{ flex : 1}} color="#5ED25C"/>
  }

  return (
    <Box flex={1}>
      <FlatList
        data={treinos}
        renderItem={renderTreinoItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={EmptyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 70 }}
      />
    </Box>
  );
}

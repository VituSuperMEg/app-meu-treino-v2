import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Text } from '@components/Text';
import { useRoute } from '@react-navigation/native';
import { api } from '@services/api';
import { Download, ThumbsDown, ThumbsUp } from 'phosphor-react-native';
import { ITreinos } from 'src/interfaces/interfaces';
import { DEFAULT_ICON } from '@utils/utils';

interface IRoute {
  params: {
    id: string;
  };
  key: string;
  name: string;
  path: string | undefined;
}

export function FindTreino() {
  const { params } = useRoute<IRoute>();
  const [find, setFind] = useState<ITreinos[]>([]);
  const [thumbs, setThumbs] = useState({
    like: false,
    dislike: false,
  });

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos/${params.id}`);
        setFind(response.data);
      } catch (error: any) {
        Alert.alert('Error', error);
      }
    }
    get();
  }, [params.id]);

  return (
    <Box flex={1} backgroundColor="mainBackground" paddingTop="l">
      <Header
        style="menu"
        name={`Treinos de ${find.length > 0 ? find[0].author.name : ''}`}
      />
      <ScrollView style={{ flex: 1 }}>
        <Box>
          {find.map((i, index) => (
            <Box key={index}>
              {i.image && (
                <Box width={400} mt="m">
                  <Image
                    source={{ uri: i?.image }}
                    style={{
                      objectFit: 'contain',
                      aspectRatio: 2,
                      width: '100%',
                    }}
                  />
                </Box>
              )}
              <Box p="l" justifyContent="space-between">
                <Box>
                  <Box flexDirection='row' justifyContent='space-between'>
                    <Text variant="bold" color="shape" fontSize={20}>
                      {i.name}
                    </Text>
                    <Text variant="bold" color="greenPrimary">
                      {i.volume_exercise}
                      {" "}
                      {DEFAULT_ICON[i.volume_exercise]}
                    </Text>
                  </Box>
                  <Text variant="bodyMin" color="textBody">
                    {i.description}
                  </Text>
                </Box>
                <Box>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Button
                      label="Curtir"
                      onPress={() =>
                        setThumbs({
                          like: !thumbs.like,
                          dislike: false,
                        })
                      }
                      textColor={thumbs.like ? 'greenPrimary' : 'shape'}
                      padding="m"
                      flexDirection="row"
                      alignItems="center"
                      gap="m"
                      borderRadius={8}
                      icon={
                        <ThumbsUp color={thumbs.like ? '#5ED25C' : '#fff'} />
                      }
                    />
                    <Button
                      label="Não Gostei"
                      textColor={thumbs.dislike ? 'dangerPrimary' : 'shape'}
                      padding="m"
                      onPress={() =>
                        setThumbs({
                          like: false,
                          dislike: !thumbs.dislike,
                        })
                      }
                      flexDirection="row"
                      alignItems="center"
                      gap="m"
                      borderRadius={8}
                      icon={
                        <ThumbsDown
                          color={thumbs.dislike ? '#ef4444' : '#fff'}
                        />
                      }
                    />
                  </Box>
                  <Button
                    label="Copiar Treino"
                    backgroundColor="shape"
                    textColor="black"
                    padding="m"
                    flexDirection="row"
                    alignItems="center"
                    gap="m"
                    borderRadius={8}
                    icon={<Download />}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}

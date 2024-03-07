import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView} from 'react-native';
import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {Text} from '@components/Text';
import {useRoute} from '@react-navigation/native';
import {api} from '@services/api';
import {
  ArrowClockwise,
  Calendar,
  CalendarBlank,
  ChatCenteredDots,
  Download,
  ThumbsDown,
  ThumbsUp,
  Timer,
} from 'phosphor-react-native';
import {ITreinos} from 'src/interfaces/interfaces';
import {DEFAULT_ICON} from '@utils/utils';
import empty from '@assets/Empty-cuate.png';
import {useUser} from '@store/auth';
import {ModalFeedBack} from './ModalFeedBack';

interface IRoute {
  params: {
    id: string;
  };
  key: string;
  name: string;
  path: string | undefined;
}

export function FindTreino() {
  const {params} = useRoute<IRoute>();
  const [find, setFind] = useState<ITreinos[]>([]);
  const [showModalFeedBack, setShowModalFeedBack] = useState(false);
  const [thumbs, setThumbs] = useState({
    like: false,
    dislike: false,
  });
  const user = useUser(s => s.user);
  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos/${params.id}`);
        console.log(response.data);
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
        favorite
      />
      {find.map((i, index) => (
        <Box key={index} flex={1} justifyContent="space-between" p="l">
          {i.image ? (
            <Box>
              <Image
                source={{uri: i?.image}}
                style={{
                  height: 200,
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          ) : (
            <Box>
              <Image
                source={empty}
                style={{
                  height: 200,
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}
          <Box mt="l">
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="bold" color="shape" fontSize={20}>
                <Text variant="body" color="textBody">
                  @{i.author.name}
                </Text>{' '}
                {'\n'}
                {i.name}
              </Text>
              <Text variant="bold" color="greenPrimary">
                {i.volume_exercise} {DEFAULT_ICON[i.volume_exercise]}
              </Text>
            </Box>
            <Text variant="bodyMin" color="textBody">
              {i.description ? i.description : 'Sem descrição :( '}
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              <Box flexDirection="row" alignItems="center" gap="s">
                <Timer color="#858585" />
                <Text variant="body" color="textBody">
                  {i.interval_exercise} /p cada
                </Text>
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                gap="s"
                justifyContent="center">
                <ArrowClockwise color="#858585" />
                <Text variant="body" color="textBody">
                  {i.rep}
                </Text>
              </Box>
            </Box>
          </Box>
          <ScrollView
            style={{marginTop: 10}}
            showsVerticalScrollIndicator={false}>
            <Text variant="bold" color="shape" fontSize={20}>
              Exercícios
              <Text variant="bold" color="greenPrimary">
                .
              </Text>
            </Text>
            {i.exercise.map((i, index) => (
              <Text variant="bodyMin" color="textBody" key={index}>
                {index + 1} - {i}
              </Text>
            ))}
          </ScrollView>
          <Box>
            {/* <Box flexDirection="row" justifyContent="space-between">
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
                icon={<ThumbsUp color={thumbs.like ? '#5ED25C' : '#fff'} />}
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
                  <ThumbsDown color={thumbs.dislike ? '#ef4444' : '#fff'} />
                }
              />
            </Box> */}
            {showModalFeedBack && (
              <ModalFeedBack
                show={showModalFeedBack}
                setShow={setShowModalFeedBack}
              />
            )}
            {i.usersId === String(user.id) ? (
              <Button
                label="Adicionar ao Calendário"
                backgroundColor="greenPrimary"
                marginTop="m"
                textColor="black"
                borderWidth={1}
                height={55}
                alignItems="center"
                justifyContent="center"
                borderRadius={8}
                flexDirection="row"
                gap="m"
                icon={<CalendarBlank />}
              />
            ) : (
              <Button
                marginTop="s"
                label="Adicionar FeedBack"
                onPress={() => setShowModalFeedBack(true)}
                backgroundColor="zinc"
                textColor="shape"
                padding="m"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap="m"
                borderRadius={8}
                icon={<ChatCenteredDots color="#fff" />}
              />
            )}
            <Button
              marginTop="s"
              label="Copiar Treino"
              backgroundColor="shape"
              textColor="black"
              padding="m"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              gap="m"
              borderRadius={8}
              icon={<Download />}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

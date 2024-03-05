import {Box} from '@components/Box';
import {api} from '@services/api';
import {useUser} from '@store/auth';
import {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import notTreino from '@assets/notreino.png';
import {Text} from '@components/Text';
import {SearchInput} from '@components/SearchInput';
import {ButtonLinear} from '@components/ButtonLienar';
import {
  Barbell,
  Feather,
  Fire,
  Folder,
  Heart,
  Lockers,
  SmileyNervous,
  Waveform,
} from 'phosphor-react-native';
import {ListTreinos} from './Treinos/ListTreinos';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export function Treinos() {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const { navigate } = useNavigation();
  return (
    <Box flex={1} backgroundColor="mainBackground" p="l">
      <Box mt="l">
        <Text variant="bold" color="shape" fontSize={20}>
          Treinos
        </Text>
        <Text variant="bodyMin" color="textBody">
          Depois que adicionar um treino marca o calendário para aquele treino.
        </Text>
        <SearchInput onSearchInput={setSearch} />
      </Box>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Box mt="l" gap="l" mb="s">
          <Text variant="body" color="shape">
            Você pode escolher a {'\n'}
            intensidade de seu treino
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ButtonLinear text="Leve" icon={<Feather color="#fff" />} />
            <ButtonLinear text="Moderado" icon={<Waveform color="#fff" />} />
            <ButtonLinear text="Pesado" icon={<Fire color="#fff" />} />
            <ButtonLinear
              text="Intenso"
              icon={<SmileyNervous color="#fff" />}
            />
          </ScrollView>
        </Box>
        <Box mt="s">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ButtonLinear text="Costas" notIcon />
            <ButtonLinear text="Peito" notIcon />
            <ButtonLinear text="Perna" notIcon />
            <ButtonLinear text="Biceps" notIcon />
          </ScrollView>
        </Box>
        <Box mt="l">
          <Text variant="bold" color="shape" fontSize={20}>
            Treinos utilizado por outros usuários
          </Text>
          <Text variant="bodyMin" color="textBody">
            Você pode utilizar treinos de outros usuários Caso ainda tenha
            dúvida de treino...
          </Text>
        </Box>
        <Box>
          <ListTreinos />
        </Box>
      </ScrollView>
      <Box>
        {show && (
          <Box
            backgroundColor="zinc400"
            position="absolute"
            zIndex={9999999}
            bottom={150}
            width={345}
            height={170}
            borderRadius={8}>
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 30,
                borderRightWidth: 30,
                borderBottomWidth: 30,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#3f3f46',
                position: 'absolute',
                bottom: -10,
                right: 5,
                transform: 'rotate(180deg)',
              }}
            />
            <Box p="l" gap='l'>
              <Button 
               label='Cadastrar Treino'
               flexDirection='row'
               gap='s'
               icon={<Lockers color='#5ED25C'/>}
               onPress={() => navigate("CreateTreino")}
              />
              <Button 
               label='Ver Meus Treino'
               flexDirection='row'
               gap='s'
               icon={<Folder color='#5ED25C'/>}
              />
              <Button 
               label='Treinos Curtidos'
               flexDirection='row'
               gap='s'
               icon={<Heart color='#5ED25C'/>}
              />
            </Box>
          </Box>
        )}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShow(prev => !prev)}
          style={{
            backgroundColor: '#5ED25C',
            width: 70,
            height: 70,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
            bottom: 60,
            zIndex: 99999,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
              android: {
                elevation: 5,
              },
            }),
          }}>
          <Barbell />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

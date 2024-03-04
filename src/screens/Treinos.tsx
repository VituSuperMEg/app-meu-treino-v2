import {Box} from '@components/Box';
import {api} from '@services/api';
import {useUser} from '@store/auth';
import {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import notTreino from '@assets/notreino.png';
import {Text} from '@components/Text';
import {SearchInput} from '@components/SearchInput';
import {ButtonLinear} from '@components/ButtonLienar';
import {Feather, Fire, SmileyNervous, Waveform} from 'phosphor-react-native';
import { ListTreinos } from './Treinos/ListTreinos';

export function Treinos() {
  const [search, setSearch] = useState('');

  console.log(search);
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
      <ScrollView style={{ flex : 1}}>
      <Box mt="l" gap="l" mb="s">
        <Text variant="body" color="shape">
          Você pode escolher a {'\n'}
          intensidade de seu treino
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ButtonLinear text="Leve" icon={<Feather color="#fff" />} />
          <ButtonLinear text="Moderado" icon={<Waveform color="#fff" />} />
          <ButtonLinear text="Pesado" icon={<Fire color="#fff" />} />
          <ButtonLinear text="Intenso" icon={<SmileyNervous color="#fff" />} />
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
      <Box mt='l'>
        <Text variant="bold" color="shape" fontSize={20}>
          Treinos utilizado por outros usuários
        </Text>
        <Text variant="bodyMin" color="textBody">
          Você pode utilizar treinos de outros usuários Caso ainda tenha dúvida
          de treino...
        </Text>
      </Box>
      <Box>
        <ListTreinos />
      </Box>
      </ScrollView>
    </Box>
  );
}

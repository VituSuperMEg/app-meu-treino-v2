import { ShareNetwork, Waveform } from 'phosphor-react-native';
import {Box} from './Box';
import {Button} from './Button';
import {Text} from './Text';
import {TextInputRestyle} from './TextInput';
import { TouchableOpacity, View } from 'react-native';
import { useUser } from '@store/auth';

export function Profille() {

  const profile = useUser(s => s.profile);
  const description = "Estou em uma nova meta para crescimento se tiver gotando dos conteúdo me segue ai."


  return (
    <Box
      backgroundColor="zinc"
      height={250}
      borderRadius={10}
      p="m"
      mt="l"
      justifyContent="space-between">
      <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
      <Text variant="body" color="shape" fontSize={20}>
        Meu Perfil
      </Text>
      <Box flexDirection='row' gap='m'>
      <Waveform color='#5ED25C'/>
      <TouchableOpacity>
      <ShareNetwork size={25} color='#858585'/>
      </TouchableOpacity>
      </Box>
      </Box>
      <Text variant="body" color="textBody">
        Seu Nível Atualmente : {profile.level}
      </Text>
      <Text variant="body" color="textBody" fontSize={10}>
        {description}
      </Text>
      <Box flexDirection="row" justifyContent="space-between">
        <Button
          label="Editar Perfil"
          borderColor="greenPrimary"
          borderWidth={1}
          padding="s"
          width={330}
          alignItems="center"
          borderRadius={6}
        />
      </Box>
    </Box>
  );
}

import {ShareNetwork, Waveform} from 'phosphor-react-native';
import {Box} from '@components/Box';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {Share, TouchableOpacity, View} from 'react-native';
import {useUser} from '@store/auth';
import {useNavigation} from '@react-navigation/native';

export function Profille() {
  const profile = useUser(s => s.profile);
  const user = useUser(s => s.user);

  const description =
    'Estou em uma nova meta para crescimento se tiver gostando dos conteúdo me segue ai. No aplicativo do meu Treino';
  const {navigate} = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Olá! Meu nome é ${user.name}. ${description}`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error.message);
    }
  };

  return (
    <Box
      backgroundColor="zinc"
      height={250}
      borderRadius={10}
      p="m"
      mt="l"
      justifyContent="space-between">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="body" color="shape" fontSize={20}>
          Meu Perfil
        </Text>
        <Box flexDirection="row" gap="m">
          <Waveform color="#5ED25C" />
          <TouchableOpacity onPress={() => handleShare()}>
            <ShareNetwork size={25} color="#858585" />
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
          onPress={() => navigate('Profille')}
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

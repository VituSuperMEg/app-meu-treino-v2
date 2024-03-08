import {TouchableOpacity} from 'react-native';
import {Box} from './Box';
import {Text} from './Text';
import {useState} from 'react';

export function RatingEmoji() {
  const emoji = ['🤩', '😁', '😀', '😔', '😭'];
  const [emojiPress, setEmojiPress] = useState('');
  const nameEmoji: any = {
    '🤩': 'Incrível',
    '😁': 'Legal',
    '😀': 'Bom',
    '😔': 'Ruim',
    '😭': 'Péssimo',
  };
  return (
    <Box flexDirection="row" gap="l" mb="m">
      {emoji.map((e, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setEmojiPress(e)}
          style={{
            alignItems: 'center',
          }}>
          <Box
            backgroundColor={emojiPress === e ? 'greenPrimary' : 'zinc'}
            width={50}
            height={50}
            borderRadius={8}
            alignItems="center"
            justifyContent="center">
            <Text variant="body" fontSize={20} color="shape">
              {e}
            </Text>
          </Box>
          <Box position="absolute" top={50}>
            {emojiPress === e && (
              <Text variant="bodyMin" color="textBody">
                {nameEmoji[e]}
              </Text>
            )}
          </Box>
        </TouchableOpacity>
      ))}
    </Box>
  );
}

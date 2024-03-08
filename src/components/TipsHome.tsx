import Carousel from 'react-native-reanimated-carousel';
import { Box } from './Box';
import { Text } from './Text';
import { Dimensions } from 'react-native';

export function TipsHome() {
  const tips = [
    {
      title: 'Catabolismo',
      tip: 'é a degradação de substâncias complexas em substâncias mais simples, resultando na liberação de energia.',
    },
    {
      title : 'Anabolismo',
      tip : 
      'é a síntese de substâncias simples em substâncias mais complexas. Esse processo fornece a energia necessária para o crecismento, manutenção e reparação tecidual.'
    }
  ];
  const width = Dimensions.get('window').width;

  return (
    <Box m='s'>
      <Carousel
        style={{
          marginRight: 10
        }}
        loop
        width={width}
        height={width / 2}
        autoPlay={false}
        data={tips}
        scrollAnimationDuration={100}
        renderItem={(
          { item }, 
        ) => (
          <>
            <Box
              position="absolute"
              backgroundColor="greenPrimary"
              alignItems="center"
              justifyContent="center"
              borderRadius={40}
              height={22}
              right={20}
              zIndex={2}
              width={100}
              top={4}>
              <Text variant="bold" color="zinc">
                Clip
              </Text>
            </Box>
            <Box 
             padding="m"
             backgroundColor="zinc" 
             borderRadius={7} 
             height={130}
             marginRight='m'
            >
              <Text variant="body" color="shape">
                {item.title} 
              </Text>
              <Text variant="bodyMin" color="textBody">
                {item.tip} 
              </Text>
            </Box>
          </>
        )}
      />
    </Box>
  );
}

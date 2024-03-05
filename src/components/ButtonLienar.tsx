import LinearGradient from 'react-native-linear-gradient';
import {Text} from './Text';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {ReactNode} from 'react';
import {Box} from './Box';

interface Button extends TouchableOpacityProps {
  text: string;
  icon?: ReactNode;
  notIcon?: boolean;
}
export function ButtonLinear({icon, text, notIcon = false, ...rest}: Button) {
  return (
    <TouchableOpacity {...rest}>
      {!notIcon ? (
        <LinearGradient
          colors={['#5ED25C', 'rgba(94,210,92,0)']}
          style={{
            height: 120,
            width: 120,
            padding: 20,
            borderRadius: 20,
            marginBottom: 10,
            marginRight: 10,
          }}>
          <Box gap="m" mt="m">
            {icon}
            <Text variant="bodyMin" color="shape" fontSize={13}>
              {text}
            </Text>
          </Box>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={['#5ED25C', 'rgba(94,210,92,0)']}
          style={{
            height: 37,
            width: 100,
            borderRadius: 5,
            marginRight : 5,
            alignItems : 'center',
            justifyContent: 'center',
          }}>
            <Text variant="bodyMin" color="shape" fontSize={13}>
              {text}
            </Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}

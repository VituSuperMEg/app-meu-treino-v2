import {TouchableOpacity, View} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
  Dimensions,
  LayoutProps,
  color,
  ColorProps,
} from '@shopify/restyle';

import {Text} from './Text';
import {Theme} from '../theme/theme';
import {ReactNode} from 'react';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress?: () => void;
  label?: string;
  textColor?: keyof Theme['colors'];
  icon?: ReactNode;
};

export const Button = ({onPress, label, textColor, icon, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props}>
        {icon}
        <Text variant="bold" color={textColor ? textColor : 'shape'}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

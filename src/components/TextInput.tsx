import {TextInput, TextInputProps, TouchableOpacity, View} from 'react-native';
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
} from '@shopify/restyle';

import {Theme} from '../theme/theme';
import {ReactNode, useState} from 'react';
import {Eye} from 'phosphor-react-native';
import {Text} from './Text';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  Dimensions &
  LayoutProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

type Props = RestyleProps &
  TextInputProps & {
    icon?: ReactNode;
    erros?: any;
    secret?: boolean;
    label?: string;
    required?: boolean;
  };

export const TextInputRestyle = ({
  icon,
  erros,
  secret,
  label,
  required,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  const [lock, setLock] = useState(secret);

  return (
    <>
      {icon ? (
        <>
          {label && (
            <Text variant="body" color="shape">
              {label} {required && (<Text variant='body' color='danger'>*</Text>)}
            </Text>
          )}
          <View {...props}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {icon}
              <TextInput
                {...rest}
                style={{
                  borderWidth: 0,
                  borderColor: 'transparent',
                  color: '#fffd',
                  flex: 1,
                }}
                secureTextEntry={lock}
              />
              {secret && (
                <TouchableOpacity onPress={() => setLock(prev => !prev)}>
                  <Eye style={{marginRight: 10}} color="#858585" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {erros}
        </>
      ) : (
        <>
          <TextInput {...rest} {...props} />
          {erros}
        </>
      )}
    </>
  );
};

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
import {ReactNode, useState, useRef} from 'react';
import {Eye, EyeClosed} from 'phosphor-react-native';
import {Text} from './Text';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
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
  const inputRef = useRef<TextInput>(null); 
  const [lock, setLock] = useState(secret);
  const [isFocused, setIsFocused] = useState(false); 

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      {icon ? (
        <>
          {label && (
            <Text variant="body" color="shape">
              {label}{' '}
              {required && (
                <Text variant="body" color="danger">
                  *
                </Text>
              )}
            </Text>
          )}
          <View
            {...props}
            style={[props.style, isFocused && {borderColor: '#5ED25C'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {icon}
              <TextInput
                ref={inputRef}
                {...rest}
                style={{
                  borderWidth: 0,
                  borderColor: 'transparent',
                  color: '#fffd',
                  flex: 1,
                }}
                secureTextEntry={lock}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {secret && (
                <TouchableOpacity onPress={() => setLock(prev => !prev)}>
                  {lock ? (
                    <Eye style={{marginRight: 10}} color="#858585" />
                  ) : (
                    <EyeClosed style={{marginRight: 10}} color="#858585"/>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
          {erros}
        </>
      ) : (
        <>
          <TextInput
            ref={inputRef}
            {...rest}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {erros}
        </>
      )}
    </>
  );
};

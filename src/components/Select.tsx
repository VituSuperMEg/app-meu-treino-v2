import RNPickerSelect from 'react-native-picker-select';
import {Text} from './Text';

interface ISelect {
  label: string;
  required?: boolean;
  items: [{label: string; value: any}];
  onValueChange: (value: any) => void;
}
export function Select({label, required, items, onValueChange}: ISelect) {
  return (
    <>
      <Text variant="body" color="shape">
        {label}{' '}
        {required && (
          <Text variant="body" color="danger">
            *
          </Text>
        )}
      </Text>
      <RNPickerSelect
        placeholder={{
          label : label,
          color: '#858585',
        }}        
        pickerProps={{
          dropdownIconColor: '#858585',
          mode : 'dialog',
        }}
        style={{
          viewContainer: {
            borderWidth: 1,
            borderColor: '#858585',
            borderRadius: 6,
          },
        }}
        onValueChange={onValueChange}
        items={items}
      />
    </>
  );
}

import RNPickerSelect from 'react-native-picker-select';


export const Select = () => {
  return (
    <RNPickerSelect
      style={{
        viewContainer : {
          borderWidth : 1,
          borderColor : '#858585',
          borderRadius : 6,
        },
      }}
      onValueChange={value => console.log(value)}
      items={[
        {label: 'Football', value: 'football'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Hockey', value: 'hockey'},
      ]}
    />
  );
};

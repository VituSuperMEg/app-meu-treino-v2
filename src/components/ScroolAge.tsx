import React from 'react';
import { View, StyleSheet } from 'react-native';
import WheelPicker from 'react-native-wheel-scrollview-picker';

const AgePicker = ({ initialValue = 18, onSave }) => {
  const ages = Array.from({ length: 100 }, (_, index) => 18 + index);

  const handleAgeChange = age => {
    onSave(age);
  };

  return (
    <View style={styles.container}>
      <WheelPicker
        dataSource={ages}
        selectedIndex={initialValue - 18}
        onValueChange={handleAgeChange}
        style={styles.picker}
        wrapperBackground='#101010'
        highlightColor='#5ED25C'
        highlightBorderWidth={3}
        itemHeight={80}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 500,
    height: 100,
  },
});

export default AgePicker;

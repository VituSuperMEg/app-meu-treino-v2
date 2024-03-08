import {Box} from '@components/Box';
import fruit from '@assets/fruit.png';
import {Image} from 'react-native';
import {useEffect, useState} from 'react';
import {Button} from '@components/Button';
import {useNavigation} from '@react-navigation/native';

export function Diet() {
  const [notDiet, setNotDiet] = useState(false);
  const {navigate} = useNavigation();

  useEffect(() => {
    if (!notDiet) {
      navigate('NotDiet');
    }
  }, [notDiet]);

  return (
    <Box flex={1} backgroundColor="mainBackground">
     
    </Box>
  );
}

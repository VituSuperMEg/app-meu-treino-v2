import {Box} from '@components/Box';
import fruit from '@assets/fruit.png';
import {Dimensions, Image} from 'react-native';
import {useEffect, useState} from 'react';
import {Button} from '@components/Button';
import {Text} from '@components/Text';
import {useNavigation} from '@react-navigation/native';

export function NotDiet() {
  const {navigate, goBack} = useNavigation();
  const width = Dimensions.get('window').width;
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box flex={1} justifyContent="space-between" p="l">
        <Box mt="l">
          <Text variant="bold" color="shape">
            Você ainda não tem dieta cadastrada! {'\n'}
            Quer cadastrar uma?
          </Text>
          <Text variant="bodyMin" color="textBody">
            A dieta é um conjunto de hábitos alimentares, ou seja, é o que e
            como ingerimos os alimentos. Toda dieta tem como objetivo melhorar a
            saúde, podendo ser para perder peso, engordar, controlar o diabetes,
            a hipertensão, colesterol alto, entre outros.
          </Text>
          <Text variant="body" color="greenPrimary">
            <Text variant="body" color="shape">
              Matéria de
            </Text>{' '}
            Nutrição Virtual.
          </Text>
        </Box>
        <Box alignItems="center" mb="xl">
          <Image source={fruit} style={{width: 291, height: 291}} />
        </Box>
        <Box>
          <Button
            backgroundColor="greenPrimary"
            width={width - 50}
            height={50}
            alignItems="center"
            justifyContent="center"
            borderRadius={6}
            label="Cadastrar Dieta"
          />
          <Button
            marginTop="s"
            borderWidth={1}
            onPress={() => goBack()}
            borderColor="greenPrimary"
            width={width - 50}
            height={50}
            alignItems="center"
            justifyContent="center"
            borderRadius={6}
            label="Voltar"
          />
        </Box>
      </Box>
    </Box>
  );
}

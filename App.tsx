import 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/theme/theme';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Box} from './src/components/Box';
import {Login} from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from '@routes/Stack';
import {AuthProvider} from './src/Providers/Auth';
import {ToastProvider} from 'react-native-toast-notifications';
import {
  AndroidLogo,
  CheckCircle,
  Info,
  X,
  XCircle,
} from 'phosphor-react-native';
import { Text } from '@components/Text';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex : 1}}>
      <NavigationContainer>
        <ToastProvider
          duration={5000}
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          icon={<AndroidLogo />}
          successIcon={<CheckCircle />}
          dangerIcon={<XCircle />}
          warningIcon={<Info />}
          textStyle={{fontSize: 20}}
          offset={50} 
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled={true}
          renderType={{
            custom_type: (toast) => (
              <View style={{padding: 15, backgroundColor: 'grey'}}>
                <Text variant='body'>{toast.message}</Text>
              </View>
            )
          }}
        >
          <AuthProvider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <Navigation />
          </AuthProvider>
        </ToastProvider>
      </NavigationContainer>
      </SafeAreaView>
    
    </ThemeProvider>
  );
}

import 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/theme/theme';
import {StatusBar, View} from 'react-native';
import {Box} from './src/components/Box';
import {Login} from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from '@routes/Stack';
import {AuthProvider} from './src/Providers/Auth';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <ToastProvider>
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
    </ThemeProvider>
  );
}

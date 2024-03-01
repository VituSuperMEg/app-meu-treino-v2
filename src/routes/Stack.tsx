import { createStackNavigator  } from "@react-navigation/stack";
import { CreateAccount } from "@screens/CreateAccount";
import { Home } from "@screens/Home";
import { Login } from "@screens/Login";
import { SendCode } from "@screens/SendCode";

const S = createStackNavigator();

export const Navigation = () => {

  return (
    <S.Navigator initialRouteName="Login" screenOptions={{
      headerShown : false
    }}>
      <S.Screen name="Login" component={Login} />
      <S.Screen name="Create" component={CreateAccount} />
      <S.Screen name="SendCode" component={SendCode} />
      <S.Screen name="Home" component={Home} />
    </S.Navigator>
  );
}
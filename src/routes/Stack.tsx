import { createStackNavigator  } from "@react-navigation/stack";
import { CreateAccount } from "@screens/CreateAccount";
import { Home } from "@screens/Home";
import { Login } from "@screens/Login";
import { SendCode } from "@screens/SendCode";
import { Tabs } from "./Tab";
import { Config } from "@screens/Users/Config";
import { EditProfill } from "@screens/Users/EditProfille";
import { FindTreino } from "@screens/Treinos/FindTreino";
import { CreateTreino } from "@screens/Treinos/CreateTreino";
import { AddTreinoInCalendar } from "@screens/AddTreinoInCalendar";
import { NotDiet } from "@screens/Diet/NotDiet";
import { FollowUser } from "@screens/FollowUser";
import { Flowwing } from "@screens/Users/Flowwing";
import { Calendario } from "@screens/Calendario";

const S = createStackNavigator();

export const Navigation = () => {

  return (
    <S.Navigator initialRouteName="Login" screenOptions={{
      headerShown : false
    }}>
      <S.Screen name="Login" component={Login} />
      <S.Screen name="Create" component={CreateAccount} />
      <S.Screen name="SendCode" component={SendCode} />
      <S.Screen name="Tabs" component={Tabs} />
      <S.Screen name="Configurações" component={Config} />
      <S.Screen name="Profille" component={EditProfill} />
      <S.Screen name="FindTreino" component={FindTreino} />
      <S.Screen name="CreateTreino" component={CreateTreino} />
      <S.Screen name="TreinoInCalendar" component={AddTreinoInCalendar} />
      <S.Screen name="NotDiet" component={NotDiet} />
      <S.Screen name="follower" component={FollowUser} />
      <S.Screen name="flowwing" component={Flowwing} />
      <S.Screen name="calendario" component={Calendario} />
    </S.Navigator>
  );
}